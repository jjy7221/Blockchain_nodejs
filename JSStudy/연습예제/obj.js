let Handsome = {
    name: 'Jin02',
    birth: '1994-02-17',
    sex: 'male',
    nation: '대한민국'

};

// 객체 출력
console.log(Handsome);

//객체 멤버 접근 console.log(Handsome['name']);
console.log(Handsome['birth']);
console.log(Handsome['sex']);
console.log(Handsome['nation']);
//접근 방법 2
console.log(Handsome.name);
console.log(Handsome.birth);
console.log(Handsome.sex);
console.log(Handsome.nation);

//반복문을 이용한 출력 for each문
for (let key in Handsome) {
    console.log(`${key}:${Handsome[key]}`);
}

var object = {
    // 요소 : 속성(Key : Values)
    number: 100,
    name: '홍길동',
    male: true,
    array: [
        10, 20, 30, 40, 50
    ],
    // 메소드
    method: function () {
        console.log(`method test`);
        object.print();
    },
    print: function () {
        console.log(`${this.number}번 ${this.name}입니다.`)
    }
};

object.method();

//객체 배열
var students = [
    {
        number: 100,
        name: `홍길동`,
        print: function () {
            console.log(`${this.number}번 ${this.name}입니다.`)
        }
    }, {
        number: 101,
        name: `이철수`,
        print: function () {
            console.log(`${this.number}번 ${this.name}입니다.`)
        }
    },
    //{number : 102 , name: `김순희`,}
];

//객체 배열을 출력할 때 forEach()함수가 효과적이다
students.forEach((s) => {
    console.log(`${s.number}번 ${s.name}입니다.`);
})

for (let student of students) {
    console.log(`${student.number}번 ${student.name}입니다.`)
    student.print();
}

//생성자 함수
function Student(number, name) {
    this.number = number;
    this.name = name;

    // 생성자 함수에서 메소드 선언
    this.print = function () {
        console.log(`${this.number}번 ${this.name}입니다.`)
    }

    //프로토 타입에 메소드 선언
    Student.prototype.print = function () {
        console.log(`$${this.number}번 ${this.name}입니다.`)
    }

}

let student2 = new Student(1000, `홍길동`);

console.log(student2);
student2.print();

// 클래스(클래스를 제공하지 않는다)
var Student2 = class {
    constructor(number, name) { // 생성자역할
        this.number = number;
        this.name = name;
    }

    print() {
        console.log(`${this.number}번 ${this.name}입니다.`);
    }
};

let student = new Student2(100, `홍길동`);
student.print();

var person = class extends Student {
    constructor(number) {
        super(number);
    }
    print() {
        super.print();
    }
};

console.log(student);

var Rectangle = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
};

var Square = class extends Rectangle {
    constructor(width) {
        super(width, width);
    }
    getArea() {
        console.log(`size is : `, super.getArea());
    }
}
let b = new Rectangle(1, 2);

let a = new Square(2);

a.getArea();

console.log(b.getArea());

//프로토 타입 >> 함수를 정의하기 위한 키워드