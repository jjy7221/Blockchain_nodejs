const express = require('express');
const {Op} = require('sequelize');
const {sequelize,User} = require('../models');

const router = express.Router();

router.post('/', (req, res) => {
    // 정적인 방법
    // User.create({
    //     "name": `홍길동`,
    //     "age" : 20,
    //     "married" : false,
    //     "comment" : `자기소개`,
    // });

    // const users = req.body;
    // let count = 0;
    // for(u of users){
    //     User.create({
    //         "name": u.name,
    //         "age" : u.age,
    //         "married" : u.married,
    //         "comment" : u.comment,
    //     });
    //     count++;
    // };

    // const users = req.body;
    // let count = 0;
    // for(u of users){
    //     User.create(u);
    //     count++;
    // };

    const userinfo = req.body;

    userinfo.forEach(element => {
        User.create(
            element
        );
    });

    res.json({note :`정상적으로 입력이 완료됐습니다.`});
});

router.get('/', async(req, res) => {
    let ret = [];
    
    await User.findAll(
        req.body
    )
    .then(data => {
        // console.log(JSON.stringify(data,8,4));?
        ret.push(JSON.stringify(data,null,4));
    })
    .catch((err) => {
        console.log(err);
    });
    
    console.log(ret);
    aa = "";
    ret.forEach(data => {
        aa+=data;
    })
    res.send( aa );
});

router.get('/sql', async(req,res) => {
    const [result, metadata] = await sequelize.query(req.body.sql);
    console.log("result", result);
    res.json({result : result});
})

router.patch('/', async(req, res) => {
    await req.body.forEach((a)=>User.update(a.values,a.where))
    // .then(data=>res.send("성공"))
    // .catch(err=>res.send("실패"));

    res.send({note : `정상적으로 수정 되었습니다.`});``
});

router.delete('/', async(req, res) => {
    await User.destroy(
        req.body
    )
    .catch((err) =>{
        res.json({note : `비정상적으로 삭제 되었습니다.`});
    });    
    res.json({note : `정상적으로 삭제 되었습니다.`});
});    



module.exports = router;