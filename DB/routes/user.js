const express = require(`express`);

const router = express.Router();

// routes/uesr.js 에서 '/'는 'user'를 붙여서 '/user'과 같은 의미를 가진다

router.get(`/`, (req, res)=>{
    console.log(req.body);
    res.json({user : `${req.method} : ${req.url}`});
});

router.post(`/`, (req, res)=>{
    console.log(req.body);
    res.json({user : `${req.method} : ${req.url}`});
});

module.exports = router;