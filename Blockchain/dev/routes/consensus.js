const express = require(`express`);
const router = express.Router();

const bitcoin = require(`../bitcoin`);

const reqp = require(`request-promise`);
const requestPromise = require('request-promise');

router.get(`/`, (req, res) => {
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOption = {
            uri : networkNodeUrl + '/',
            method : `GET`,
            json : true
        };
        requestPromises.push(reqp(requestOption))
    });
    Promise.all(requestPromises)
    .then(blockchains => {
        const currentChainLength = bitcoin.chain.length;
        let maxChainLength = currentChainLength;
        let newLongestChain = null;
        let newTransactions = bitcoin.newTransactions.length;

        // 가장 긴 블록체인을 검색

        blockchains.forEach(blockchain=>{
            if(blockchain.chain.length>maxChainLength){
                maxChainLength = blockchain.chain.length;
                newLongestChain = blockchain.chain;
                newTransactions = blockchain.newTransactions;
            }
            else if(blockchain.chain.length==maxChainLength){
                if(blockchain.newTransactions.length>newTransactions ){
                    newLongestChain = blockchain.chain;
                    newTransactions=blockchain.newTransactions;
                }
            }
    });
    if(!newLongestChain || (newLongestChain&& !bitcoin.chainlsValid(newLongestChain))){
        res.json({
            note:`Current Chain has not been replaced.`,
            chain:bitcoin.chain
        });
    }
        else{
            bitcoin.chain = newLongestChain;
            bitcoin.newTransactions = newTransactions;
            res.json({
                note:`This Chain has been replaced.`,
                chain: bitcoin.chain,
                newTransactions:bitcoin.newTransactions
            });
        }
    });
});


module.exports = router;