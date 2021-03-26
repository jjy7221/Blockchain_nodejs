const Blockchain = require(`./dev/Blockchain`);

const bitcoin = new Blockchain();

const prevBlockHash = `Jin02 very very handsome guy`

const curBlockData = [
    {
        amount: 100,
        sender: `JIN02`,
        recipient: `Quiet un`
    }
];

const nonce = 100;

console.log(bitcoin.hashBlock(prevBlockHash, curBlockData, nonce));