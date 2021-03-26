const Blockchain = require(`./dev/Blockchain`);
const bitcoin = new Blockchain();

// 임의의 값을 파라미터로 입력
bitcoin.createNewBlock(1234, `ABCDEFGHIJK`, `1234567890`);
// John이 Tom에게 100을 발신하는 트랜잭션 생성
bitcoin.createNewTransaction(100,`Jin0`,`Master Kim`);
// 여러개의 트랜잭션 생성
bitcoin.createNewTransaction(100,`Lee pearl`,`Aftershock`);
bitcoin.createNewTransaction(100,`Quiet Woon`,`YG`);
bitcoin.createNewTransaction(100,`Horse Cheong`,`Mark Jo`);
bitcoin.createNewBlock(5678,`BC401`,`BCmate`);

console.log(bitcoin);

console.log(bitcoin.chain[1]); // 1번째 인덱스 체인 확인