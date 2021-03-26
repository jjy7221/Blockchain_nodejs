const http = require(`http`); // http 모듈에 있는 함수를 변수 http를 이용해서 사용
const fs = require(`fs`);     // fs 모듈에 있는 함수를 변수 fs를 이용해서 사용

const app = http.createServer((req, res) => { // http 모듈에 있는 서버생성함수
    console.log(req.url + ':' + req.method); // 클라이언트 요청을 터미널에 출력
    fs.readFile(`./server1.html`, null, (err, data) => {    // server1.html을 읽어서 응답
        res.write(data);  // 읽은 데이터 쓰기
        res.end();          // 읽은 데이터 전송
    });
});

app.listen(3000, () => { // 만들어진 서버로 3000번 포트에서 대기
    console.log(`3000번 포트에서 접속 대기 중 입니다.`);
})