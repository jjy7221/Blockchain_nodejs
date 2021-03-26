// Visual Studio Code에서 dev폴더를 생성하고 Blockchain.js추가 블록체인 생성자 함수
const currentNodeUrl = process.argv[3];

const {v1: uuid} = require('uuid');

const sha256 = require(`sha256`);

function Blockchain(){
    // 채굴한 모든 블록을 저장하는 배열 선언
    this.chain = [];
    // 블록에 아직 저장되지 않는 모든 트랜잭션을 저장하는 배열 선언
    this.newTransactions = [];

    // Genesis 블록을 만들기 위해 임의의 값으로 생성
    this.createNewBlock(100,'0','0');

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = []; //  노드들의 URL을 저장하는 배열

}

// Blockchain 생성자 함수에 CreateNewBlock 메소드 추가
Blockchain.prototype.createNewBlock = function (nonce, prevBlockHash, hash) {
    // Blockchain 안의 새로운 블록으로 관련 데이터들은 모두 이 안에 저장
    const newBlock = {
        index: this.chain.length + 1, // 새로운 블록이 몇 번째 블록인지
        timestamp: Date.now(), // 블록이 생성된 시점
        transactions: this.newTransactions, // 새로운 트랜잭션들과 미결 트랜잭션들이 추가됨
        nonce: nonce, // nonce : 자격증명(POW)을 통해 찾아진 숫자 값
        hash: hash, // hash : 트랜잭션들의 해시값
        prevBlockHash: prevBlockHash, // prevBlockHash : 이전 블록에서 직전 블록까지 트랜잭션들의 해시값
    }

    // 새로운 블록을 만들 때 새로운 트랜잭션들을 저장할 배열을 초기화
    this.newTransactions = [];
    // 새로운 블록을 체인에 추가
    this.chain.push(newBlock);
    // 새로운 블록을 반환
    return newBlock;
}

// Blockchain에서 제일 마지막 블록 반환
Blockchain.prototype.getLastBlock = function(){
    // 체인 배열에서 제일 마지막 블록을 반환
    return this.chain[this.chain.length -1];
}


// Blockchain에 새로운 Transaction을 생성
Blockchain.prototype.createNewTransaction = function(amount, sender, recipient){
    const newTransaction = {
        amount : amount,        // 송금량(액)
        sender : sender,        // 발송인 주소
        recipient : recipient,  // 수신자 주소
        transactionId: uuid().split('-').join('')   // Transaction에 id 부여
    };
    return newTransaction;
    // this.newTransactions.push(newTransaction);
    // return this.getLastBlock()['index']+1;
}

// newTransaction을 배열에 추가
Blockchain.prototype.addTransactionTonewTransactions = function(transactionObj){
    this.newTransactions.push(transactionObj);
    return this.getLastBlock()[`index`]+1;
}

Blockchain.prototype.hashBlock = function(prevBlockHash, curBlockData, nonce){
   
    const dataString = prevBlockHash 
    + nonce.toString() // 숫자인 nonce를 문자열로 변경
    + JSON.stringify(curBlockData); // JSON 데이터를 문자열로 변경

    // 문자열로 만든 블록 데이터를 해싱
    const hash = sha256(dataString);

    return hash;
}

Blockchain.prototype.proofOfWork = function (prevBlockHash, curBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(prevBlockHash, curBlockData, nonce);

    while (hash.substring(0, 4) !== "0000") {
        nonce++;
        hash = this.hashBlock(prevBlockHash, curBlockData, nonce);
        process.stdout.write(nonce + " : " + hash + "\r");
    }
    process.stdout.write("\n");
    return nonce;
}

Blockchain.prototype.chainlsValid = function (blockchain) {
    let validChain = true;

    // 모든 블록을 순회하며 직전 블록의 해쉬 함수값과 현재 블록의 해쉬값을 비교확인
    for (var i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        const blockHash = this.hashBlock(prevBlock[`hash`], {
                transaction: currentBlock['transactions'], Index: currentBlock['index']
                },
                currentBlock['nonce']
            );

        if (blockHash.substring(0, 4) !== '0000') 
            validChain = false;
        
        if (currentBlock['prevBlockHash'] !== prevBlock['hash']) 
            validChain = false;
        };

        // 최초 생성한 genesis 블록 검증
        const GenesisBlock = blockchain[0];
        const correctNonce = GenesisBlock['nonce'] === 100;
        const correctPreviousBlockHash = GenesisBlock['prevBlockHash'] === '0';
        const correctHash = GenesisBlock['hash'] === '0';
        const correctTransactions = GenesisBlock['transactions'].length ===0;

        // 유요한 genesis 블록을 가지고 있지 않으면
        if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions)
            validChain = false;

        return validChain;    
};

// 전체 블록체인에서 특정 해시 관련 블록을 검색하는 메소드
Blockchain.prototype.getBlock = function(blockHash){
    let correctBlock = null;
    this.chain.forEach(block => {
        if(block.hash === blockHash){
            correctBlock = block;
        }
    });
    return correctBlock;
}

// 전체 블록체인에서 특정 트랜잭션을 검색하는 메소드
Blockchain.prototype.getTransaction = function(transactionId){
    let correctTransaction = null;
    let correctBlock = null;
    this.chain.forEach(block => {
        block.transactions.forEach(transaction => {
            if(transaction.transactionId === transactionId){
                correctTransaction = transaction;
                correctBlock = block;
            };
        });
    });
    return {
        transaction: correctTransaction,
        block: correctBlock
    };
};

// 전체 블록체인에서 특정 주소에 대한 데이터를 검색하는 메소드
Blockchain.prototype.getAddressData = function(address){
    const addressTransactions = [];
    this.chain.forEach(block => {
        block.transactions.forEach(transaction =>{
            if(transaction.sender === address || transaction.recipient === address){
                addressTransactions.push(transaction);
            };
        });
    });
    let balance = 0;
    addressTransactions.forEach(transaction => {
        if(transaction.recipient === address){
            balance += transaction.amount;
        }
        else if( transaction.sender === address){
            balance -= transaction.amount;
        }
    });
    return {
        addressTransactions: addressTransactions,
        addressBalance: balance
    };
};



// 생성자 export
module.exports = Blockchain;
