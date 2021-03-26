const express = require('express');
const bodyparser = require('body-parser');
const bitcoin = require(`./bitcoin`) ;

const dotenv = require(`dotenv`);
// morgan
const morgan = require(`morgan`);
require(`dotenv`).config();


var app = new express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(morgan(`dev`));
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));

// ● 3개의 엔드 포인트 구현 전체 블록체인을 가지고 와서 그 안의 데이터를 조회
const routerindex = require(`./routes`);
app.use(`/`, routerindex);

// 새로운 트랜잭션 생성
const routertransaction = require(`./routes/transaction`);
app.use(`/transaction`, routertransaction);

// 새로운 블록 채굴
const routermine = require(`./routes/mine`);
app.use(`/mine`, routermine);

// 다중 노드 등록
// 자신의 서버에 등록하고 전체 네트워크에 브로드 캐스팅
const routerregister = require(`./routes/register`);
app.use(`/register`, routerregister);

// 새로운 노드에 기존 정보 등록
const routerconsensus = require(`./routes/consensus`);
app.use(`/consensus`, routerconsensus);

// html
const routerexplorer = require(`./routes/explorer`);
app.use(`/explorer`, routerexplorer);



const port = process.argv[2];
// 서로 다른 포트에서 실행되도록 하기 위해 포트를 파라미터로 설정
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
})