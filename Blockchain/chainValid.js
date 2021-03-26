const Blockchain = require('./dev/Blockchain');
const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1611817099101,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "prevBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1611817114683,
            "transactions": [],
            "nonce": 112088,
            "hash": "0000356b4561249916210c6e146f364bf04fe3a1562ba151ea9d507397f833ef",
            "prevBlockHash": "0"
        }
    ],
    "newTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "33da87e0613611eb9ae9ede6c33dc6fd",
            "transactionId": "3d2671b0613611eb9ae9ede6c33dc6fd"
        }
    ],
    "currentNodeUrl": "http://164.125.121.183:3000",
    "networkNodes": []
}

console.log(`Valid : `, bitcoin.chainlsValid(bc1.chain));