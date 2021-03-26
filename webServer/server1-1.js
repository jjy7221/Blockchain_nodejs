const http = require(`http`);

const app = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
    res.write('<h1>Hello node</h1>');
    res.end('<p>Hello Sever!</p>');
});

app.listen(3000);

app.on('listening', () => {
    console.log('3000번 포트에서 당신을 기다리고 있습니다.');
});

app.on('error', (error) => {
    console.log(error);
});

/*
    Listen 메서드에 callback을 넣는 대신 서버에 'Listening' 이벤트 리스너를 추가하는
    방법도 가능. 'error' 이벤트 리스너도 추가
*/