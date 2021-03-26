const express = require(`express`); // expresss 모듈 import

const app = express();              // app에 express()할당

app.get('/', (req, res) => {        // tkdydwkrk '/' 경로로 GET method로 접근하면
    res.sendFile(__dirname + "/server1.html");  // index.html을 전송
});

app.listen(3000, () => {
    console.log(`Standby port : 3000`);
});

/* 사용자가 웹브라우저 주소입력창에서  `localhost:3000`으로 입력하면
    Default로 '/'경로의 'Get Method가 선택됨.
*/