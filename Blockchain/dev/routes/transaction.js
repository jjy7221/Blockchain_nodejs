const express = require(`express`);
const router = express.Router();

const reqp = require(`request-promise`);
const bitcoin = require(`../bitcoin`);

router.post('/', (req, res) => {
    const newTransaction = req.body;

    const blockIndex = bitcoin.addTransactionTonewTransactions(newTransaction)

    res.json({note: `Transaction will be added in block ${blockIndex}.`});
});


router.post(`/broadcast`, (req,res) => {
    const newTransaction = bitcoin.createNewTransaction(
        req.body.amount, req.body.sender, req.body.recipient);
    
    bitcoin.addTransactionTonewTransactions(newTransaction);
    const requestPromise = []
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOption = {
            uri:networkNodeUrl+ `/transaction`,
            method : `POST`,
            body : newTransaction,
            json : true
        };
        requestPromise.push(reqp(requestOption));
    });
        Promise.all(requestPromise).then(data => {
            res.json({note: `Transaction created and broadcast successfully.`})
        });
});

module.exports = router;