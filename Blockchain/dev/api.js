const express = require('express');
const bodyparser = require('body-parser');
const Blockchain = require('./blockchain');
const {v1: uuid} = require('uuid');

var app = new express();
var bitcoin = new Blockchain();
var nodeAddress = uuid().split('-').join('');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.send(`Hello World!`);
});

// ● 3개의 엔드 포인트 구현 전체 블록체인을 가지고 와서 그 안의 데이터를 조회
app.post('/blockchain', function (req, res) {
    res.send(bitcoin);
});

// 새로운 트랜잭션 생성
app.post('/transaction', function (req, res) {
    // console.log(req.body);  요청 내용을 콘솔에 출력 res.send(`The amount of the transaction
    // is ${req.body.amount} bitcoin from ${req.body.sender} to
    // ${req.body.recipient}.`);   요청 결과를 문자열로 반환 res.send(`It works`);

    const blockIndex = bitcoin.createNewTransaction(
        req.body.amount,
        req.body.sender,
        req.body.ricipient
    )
    res.json({note: `Transaction will be added in block ${blockIndex}.`});
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

    // 새로운 블록을 다른 노드들에게 통지
    res.json({note: "New block mined successfully", block: newBlock});

    // 새로운 블록을 채굴한 것에 대한 보상처리 2018년 기분 보상은 12.5BTC, sender가 "00"이면 보상의 의미
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);
});

app.listen(3000, function () {
    console.log(`Listening on port 3000...`);
})