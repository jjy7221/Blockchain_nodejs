const Blockchain = require(`./dev/Blockchain`);

const bitcoin = new Blockchain();

const prevBlockHash = `Jung Jin-yeong the Handiest in the World `;

const curBlockData = [
    {amount : 100, sender : `Princess Jin0`, recipient : `Princess Yeojinny`},
    {amount : 50, sender : `Lee pearl?`, recipient : `Mark Jo`},
    {amount : 10, sender : `Master Kim`, recipient : `Talker NOW`},
];


console.log(bitcoin.proofOfWork(prevBlockHash, curBlockData));