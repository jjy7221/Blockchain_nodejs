const express = require(`express`);
const router = express.Router();

const {v1: uuid} = require('uuid');
var nodeAddress = uuid().split('-').join('');
const reqp = require(`request-promise`);

const bitcoin = require(`../bitcoin`);

router.post('/', (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const prevBlockHash = lastBlock['hash'];
    const curBlockData = {
        transaction: bitcoin.newTransactions,
        Index: lastBlock['index'] + 1
    };
    const nonce = bitcoin.proofOfWork(prevBlockHash, curBlockData);
    const blockHash = bitcoin.hashBlock(prevBlockHash, curBlockData, nonce);
    const newBlock = bitcoin.createNewBlock(nonce, prevBlockHash, blockHash);

    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOption = {
            uri:networkNodeUrl+ `/mine/receive-new-block`,
            method:`POST`,
            body:{newBlock:newBlock},
            json:true
        };
        requestPromises.push(reqp(requestOption))
    });
    Promise.all(requestPromises)
    .then(data => {
        const requestOption = {
            uri:bitcoin.currentNodeUrl + `/transaction/broadcast`,
            method:`POST`,
            body:{
                amount : 12.5,
                sender : `00`,
                recipient:nodeAddress
            },
            json:true
        };
        return reqp(requestOption);
    })
    .then(data =>{
        res.json({
            note:`New block mined & broadcast successfully`,
            block : newBlock
        });
    });
});


router.post(`/receive-new-block`, (req,res) =>{
    const newBlock = req.body.newBlock;
    const lastBlock = bitcoin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.prevBlockHash;
    const correctIndex = lastBlock[`index`] + 1 === newBlock['index'];

    if(correctHash && correctIndex){
        bitcoin.chain.push(newBlock);
        bitcoin.newTransactions = [];
        res.json({
            note: `New block received and accepted.`,
            newBlock:newBlock
        });
    }
    else{
        res.json({
            note: `New block rejected.`,
            newBlock:newBlock
        });
    }
});



module.exports = router;