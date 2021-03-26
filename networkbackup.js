const express = require('express');
const bodyparser = require('body-parser');
const Blockchain = require('./blockchain');
const {v1: uuid} = require('uuid');
const reqp = require(`request-promise`);
const requestPromise = require('request-promise');

// morgan
const morgan = require(`morgan`);
require(`dotenv`).config();

var app = new express();
var bitcoin = new Blockchain();
var nodeAddress = uuid().split('-').join('');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

app.get('/', function (req, res) {
    res.send(`Hello World!`);
});

// ● 3개의 엔드 포인트 구현 전체 블록체인을 가지고 와서 그 안의 데이터를 조회
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
});

// 새로운 트랜잭션 생성
app.post('/transaction', function (req, res) {
    // console.log(req.body);  요청 내용을 콘솔에 출력 res.send(`The amount of the transaction
    // is ${req.body.amount} bitcoin from ${req.body.sender} to
    // ${req.body.recipient}.`);   요청 결과를 문자열로 반환 res.send(`It works`);
    const newTransaction = req.body;

    const blockIndex = bitcoin.addTransactionTonewTransactions(newTransaction)
    //bitcoin.createNewTransaction(
        // req.body.amount,
        // req.body.sender,
        // req.body.ricipient

       
    //)
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});

//
app.post(`/transaction/broadcast`, function(req,res){
    const newTransaction = bitcoin.createNewTransaction(
        req.body.amount, req.body.sender, req.body.recipient);
    
    bitcoin.addTransactionTonewTransactions(newTransaction);
    const requestPromise = []
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOption = {
            uri:networkNodeUrl+ `/transaction`,
            method : `POST`,
            body : newTransaction,
            json : true
        };
        requestPromise.push(reqp(requestOption));
    });
        Promise.all(requestPromise).then(data => {
            res.json({note: `Transaction created and broadcast successfully.`})
        });
});

// 새로운 블록 채굴
app.post('/mine', function (req, res) {
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
            uri:networkNodeUrl+ `/receive-new-block`,
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
    // 새로운 블록을 다른 노드들에게 통지
    //res.json({note: "New block mined successfully", block: newBlock});

    // 새로운 블록을 채굴한 것에 대한 보상처리 2018년 기분 보상은 12.5BTC, sender가 "00"이면 보상의 의미
    //bitcoin.createNewTransaction(12.5, "00", nodeAddress);
});

app.post(`/receive-new-block`, function(req,res){
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



// 다중 노드 등록
// 자신의 서버에 등록하고 전체 네트워크에 브로드 캐스팅
app.post(`/register-and-broadcast-node`, function (req, res) {
    const newNodeUrl = req.body.newNodeUrl; // 등록 요청 URL

    // 배열 networkNodes에서 없으면 추가
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) 
        bitcoin.networkNodes.push(newNodeUrl);
    
    // 다른 노드에게 브로드 캐스팅
    const regNodesPromises = []; // promise 객체들을 저장하는 배열
    bitcoin.networkNodes.forEach(networkNodeUrl => {
            const requestOption = {
                uri: networkNodeUrl + `/register-node`,
                method: `POST`,
                body: {
                    newNodeUrl: newNodeUrl
                },
                json: true
            };
            regNodesPromises.push(reqp(requestOption))
        });

    Promise.all(regNodesPromises) // promise 객체들을 비동기 실행
    .then(data => {
        const bulkRegisterOptions = {
            uri : newNodeUrl + '/register-nodes-bulk',
            method : 'POST',
            body: {allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
            json: true
        };
        return reqp(bulkRegisterOptions);
    })
    .then(data => {
        res.json({note : `New node registered with network successfully.`});
    });
});

// 새로 등록 요청받은 노드를 자신의 서버에 등록
app.post(`/register-node`, function(req,res) {
    const newNodeUrl = req.body.newNodeUrl; // 등록 요청 URL

    // 배열 networkNodes에 없으면 true, 있으면 false
    const nodeNotExist = (bitcoin.networkNodes.indexOf(newNodeUrl) == -1);

    // currentNodeUrl과 newNodeUrl이 다르면 true,  같다면 false
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

    // 기존에 없고, 현재 노드의 url과 다르면 추가
    if(nodeNotExist && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    // 등록 요청에 대한 회신
    res.json({note : 'New node registered successfully.'});
});

// 여러 개의 노드를 자신의 서버에 한 번에 등록
app.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
	});

	res.json({ note: 'Bulk registration successful.' });
});

app.get(`/consensus`, function(req, res) {
    const requestPromises = [];
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOption = {
            uri : networkNodeUrl + '/blockchain',
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

// BlockHash가 전송되면 해당 블록이 반환
app.get(`/block/:blockHash`, function(req, res){
    const blockHash = req.params.blockHash;
    const correctBlock = bitcoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });
});

// transactionId가 전송되면 해당 트랜잭션과 블록을 반환
app.get(`/transaction/:transactionId`, function(req, res){
    const transactionId = req.params.transactionId;
    const transactionData = bitcoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block:transactionData.block
    });
});

// address가 전송되면 해당 주소와 관련된 데이터를 반환
app.get(`/address/:address`, function(req, res){
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address);
    res.json({
        addressData: addressData
    });
});

// 웹 브라우저에서 검색할 수 있도록 하는 사용자 인터페이스 호출
app.get(`/block-explorer`, function(req, res){
    res.sendFile(`./block-explorer/index.html`, {root:__dirname});
});


const port = process.argv[2];
// 서로 다른 포트에서 실행되도록 하기 위해 포트를 파라미터로 설정
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
})