const express=require(`express`);	// express 모듈 import

const app=express();				// app에 express()를 할당
app.get(`/`, (req, res) => {
	res.json({ note: `This is a JSON for ${req.method} Method1`});
});
app.post(`/`, (req, res) => {
	res.json({ note: `This is a JSON for ${req.method} Method2`});
});
app.post(`/firstendpoint`, (req, res) => {
    console.log(req.post);
	res.json({ note: `This is a JSON for ${req.method} Method of firstendpoint`});
});

app.listen(3000, () => {	 console.log(`standby port : 3000`); });

// Get 방식 >> 데이터를 받아올 때

// post 방식 >> 데이터 입력할 때
//           >>  숨겨서 보낸다 (내부 프로토콜로 외부에서 안 보이게 incoding)

// put 방식 >> 수정 할 때

// patch 방식 >> 1개의 필드만 수정

// push >> 알림이라 생각하면 될 듯?