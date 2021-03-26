const express = require(`express`);

const router = express.Router();

const bitcoin = require(`../bitcoin`);

router.get(`/block/:blockHash`, function(req, res){
    const blockHash = req.params.blockHash;
    const correctBlock = bitcoin.getBlock(blockHash);
    res.json({
        block: correctBlock
    });
});

// transactionId가 전송되면 해당 트랜잭션과 블록을 반환
router.get(`/transaction/:transactionId`, function(req, res){
    const transactionId = req.params.transactionId;
    const transactionData = bitcoin.getTransaction(transactionId);
    res.json({
        transaction: transactionData.transaction,
        block:transactionData.block
    });
});

// address가 전송되면 해당 주소와 관련된 데이터를 반환
router.get(`/address/:address`, function(req, res){
    const address = req.params.address;
    const addressData = bitcoin.getAddressData(address);
    res.json({
        addressData: addressData
    });
});

// 웹 브라우저에서 검색할 수 있도록 하는 사용자 인터페이스 호출
router.get(`/`, function(req, res){
    res.sendFile(`C:/JavaWork/Blockchain/dev/block-explorer/index.html`);
});
// {root:__dirname}
module.exports = router;