const http = require('http');

const fs = require('fs').promises;

http.createServer(async(req, res) => {
    try {
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, {'Content-Type' : 'text/html; charset=uft-8'});
        res.end(data);
    }catch(err){
        console.error(err);
        res.writeHead(500,{'Content-Type':'text/html; charset=utf-8'});
        res.end(err.message)
    }
}).listen(3002, () => {console.log('3002번 포트에서 접속 대기 중 입니다.')})