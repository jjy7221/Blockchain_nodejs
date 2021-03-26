//Blockchain.js를 사용하기 위해 import
const Blockchain = require(`./dev/Blockchain`);
// Blockchain 생성자 함수의 인스턴스 생성
const bitcoin = new Blockchain();

bitcoin.createNewBlock(1234,`ABCDEFGHJK`,`1234567890`);
bitcoin.createNewBlock(2234,`ABCDHIJK`,`123456789A`);
bitcoin.createNewBlock(1334,`ABCFGHIJK`,`123456789B`);
bitcoin.createNewBlock(1534,`ABCDFGHIJK`,`123456789C`);
bitcoin.createNewBlock(14434,`ABCEIJK`,`123456789D`);
bitcoin.createNewBlock(1634,`ABCDEFDGHIJK`,`123456789E`);
bitcoin.createNewBlock(1734,`ABCDEGHIJK`,`123456789F`);
bitcoin.createNewBlock(1434,`ABCDEFGHIJK`,`123456789G`);
bitcoin.createNewBlock(1234,`ABCDEFJJHIJK`,`123456789H`);
bitcoin.createNewBlock(11134,`ABCDEFDGHIJK`,`123456789I`);
bitcoin.createNewBlock(1234,`ABCDZFGHIJK`,`123456789J`);
bitcoin.createNewBlock(01234,`ABCDEFGHIJK1`,`123456789K`);
bitcoin.createNewBlock(001234,`ABCDEFGHIJK2`,`123456789L`);
bitcoin.createNewBlock(0001234,`ABCDEFGHIJK3`,`123456789M`);
bitcoin.createNewBlock(0021234,`ABCDEFGHIJK4`,`123456789N`);
bitcoin.createNewBlock(122134,`ABCDEFGHIJK5`,`123456789O`);

console.log(bitcoin);