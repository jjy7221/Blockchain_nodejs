const express = require(`express`);

const router = express.Router();

// routes/index.js 에서 '/'는 라우팅을 위한 경로와는 상관없이 '/'로 처리한다

router.get(`/`, (req,res)=>{
    console.log(req.body);
    res.json({jin:`${req.method} : ${req.url}`});
});

router.post(`/`, (req,res)=>{
    console.log(req.body);
    res.json({jin:`${req.method} : ${req.url}`});
});

module.exports = router;