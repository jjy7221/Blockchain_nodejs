// 생성자 함수를 이용하여 상품 객체 배열을 만들고 이를 출력하는 프로그램을 작성하라
// ●Property
// ㆍ name : '갤럭시','아이폰','엑스페리아','화웨이'
// ㆍ price : 100,101,102,103
// ㆍ nation : `Korea`,`Us`,'Japna','China'
// ●Method
// ㆍprint function product(name, price, nation) {
//     this.name = name;
//     this.price = price;
//     this.nation = nation;
//     this.print = () => {
//         console.log(
//             `name : ${this.name}, price :${this.price}, nation : ${this.nation}`
//         );
//     }
// }

let phone = [];

// 방법 1)
let name = ['갤럭시', '아이폰', '엑스페리아', '화웨이'];
let price = [100, 101, 102, 99];
let nation = ['한국', '미국', '일본', '중국'];
for (let i = 0; i < named.length; i++) {
    phone[i] = new product(name[i], price[i], nation[i]);
}

// 방법2)Static한 방법 >> 이런 식으로는 코드를 짜면 필드에서 맞을 수가 있다.
let phone = [
    Samsung = new commod('갤럭시', 100, 'Korea'),
    Apple = new commod('아이폰', 101, 'US'),
    dd = new commod('엑스페리아', 102, 'Japan'),
    jajang = new commod('화웨이', 99, 'China')
];

// 방법 3)
var Samsung = new product('갤럭시', 100, 'Korea')
var Apple = new product('아이폰', 101, 'US')
var dd = new product('엑스페리아', 102, 'Japan')
var jajang = new product('화웨이', 99, 'China')

phone.push(Samsung);
phone.push(Apple);
phone.push(dd);
phone.push(jajang);

phone.forEach((s) => {
    s.print();
})

// 진주가 진짜로 생각하는 나의 모습 ㄹㅇ 진주가 쳤음 !!내가 봤는데 놀리는게 아니였음 !!진짜로
function Jin02(name, face, height) {
    this.name = name;
    this.face = face;
    this.height = height;

    this.print = function () {
        console.log(`${this.name}, is ${this.face} and ${this.height}`);
    }
}
let Jackie = new Jin02('정진영', 'handsome', 'tall');
Jackie.print();

// 문제 2)

function Students(name) {
    this.name = name;
    this.subject = ['국어', '영어', '수학', 'C언어'];
    this.score = [];

    this.setscore = () => {
        for (let i = 0; i < this.subject.length; i++) {
            this.score[i] = Math.floor(Math.random() * 100);
        }
    }

    this.print = () => {
        console.log(`-------------------------------------`);
        console.log(`${this.name}`);
        console.log(`과 목 : 점 수 `);
        for (let i = 0; i < this.subject.length; i++) {
            console.log(`${this.subject[i]} : ${this.score[i]}`);
        }
    }
}

let BCcls = [];

let BCmate = [
    '지녕이',
    '조용!!운',
    '혀누킴',
    'Mark Jo',
    '말청우',
    '리펄',
    '웅이형',
    '청순여진',
    '린재형',
    '쩡기형',
    '민서누낭',
    '동여리햄',
    '서니누나'
]

let FindMin = (BCcls) => {

    for (let i = 0; i < BCcls[i].subject.length; i++) { // 사람
        let min = 100;
        let pp;
        for (var j = 0; j < BCcls.length; j++) { // 과목
            if (BCcls[j].score[i] < min) {
                min = BCcls[j].score[i];
                pp = BCcls[j].name;
            }

        }
        console.log(`-------------------------------------`);
        console.log(`${BCcls[0].subject[i]} 꼴등 >> ${pp} : ${min}점`);
    }
}

let FindMax = (BCcls) => {

    for (let i = 0; i < BCcls[i].subject.length; i++) { // 사람
        let max = 0;
        let pp;
        for (var j = 0; j < BCcls.length; j++) { // 과목
            if (BCcls[j].score[i] > max) {
                max = BCcls[j].score[i];
                pp = BCcls[j].name;
            }

        }

        console.log(`-------------------------------------`);
        console.log(`${BCcls[0].subject[i]} 일등 >> ${pp} : ${max}점`);
    }
}

for (let i = 0; i < BCmate.length; i++) {
    BCcls[i] = new Students(BCmate[i])
    BCcls[i].setscore();
}

BCcls.forEach((s) => {
    s.print();
})

FindMin(BCcls);
FindMax(BCcls);