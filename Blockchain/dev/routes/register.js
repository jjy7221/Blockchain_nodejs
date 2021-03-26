const express = require(`express`);
const router = express.Router();

const reqp = require(`request-promise`);
const requestPromise = require('request-promise');
const bitcoin = require(`../bitcoin`);

router.post(`/`, function (req, res) {
    const newNodeUrl = req.body.newNodeUrl; // 등록 요청 URL

    // 배열 networkNodes에서 없으면 추가
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) 
        bitcoin.networkNodes.push(newNodeUrl);
    
    // 다른 노드에게 브로드 캐스팅
    const regNodesPromises = []; // promise 객체들을 저장하는 배열
    bitcoin.networkNodes.forEach(networkNodeUrl => {
            const requestOption = {
                uri: networkNodeUrl + `/register/register-node`,
                method: `POST`,
                body: {
                    newNodeUrl: newNodeUrl
                },
                json: true
            };
            regNodesPromises.push(reqp(requestOption))
        });

    Promise.all(regNodesPromises) // promise 객체들을 비동기 실행
    .then(data => {
        const bulkRegisterOptions = {
            uri : newNodeUrl + `/register/register-nodes-bulk`,
            method : 'POST',
            body: {allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
            json: true
        };
        return reqp(bulkRegisterOptions);
    })
    .then(data => {
        res.json({note : `New node registered with network successfully.`});
    });
});

router.post(`/register-node`, function(req,res) {
    const newNodeUrl = req.body.newNodeUrl; // 등록 요청 URL

    const nodeNotExist = (bitcoin.networkNodes.indexOf(newNodeUrl) == -1);

    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;

    if(nodeNotExist && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl);
    }
    res.json({note : 'New node registered successfully.'});
});

// 여러 개의 노드를 자신의 서버에 한 번에 등록
router.post('/register-nodes-bulk', function(req, res) {
	const allNetworkNodes = req.body.allNetworkNodes;
	allNetworkNodes.forEach(networkNodeUrl => {
		const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
		const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
		if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
	});

	res.json({ note: 'Bulk registration successful.' });
});

module.exports = router;