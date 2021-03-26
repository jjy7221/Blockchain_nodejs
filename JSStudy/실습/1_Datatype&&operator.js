// 키보드에서 임의의 두 숫자를 입력 받아 가감승제를 실행한 후 그 결과를 출력하는 
// 프로그램을 작성하고 실행하라
let num1 = 20;
let num2 = 30;

console.log("num1 + num2 =" + (num1+num2) );
console.log("num1 - num2 =" + (num1-num2) );
console.log("num1 * num2 =" + (num1*num2) );
console.log("num1 / num2 =" + (num1/num2) );
console.log("num1 % num2 =" + (num1%num2) );

// 1마일은 1.6Km이다. 키보드에서 마일(정수)을 입력 받아 km로 변환 해 출력하는 
// 프로그램을 작성하고 실행하라
let distance = 10;

console.log(distance + " 은 " + (distance*1.6) + "Km이다." );

//원의 반지름을 입력 받아 원의 둘레와 원의 면적을 출력하는 프로그램을 작성하라
let radius = 3;

console.log("반지름이 " + radius + " 인 원의 둘레는" + (2*radius*3.14) + "이다." );
console.log("반지름이 " + radius + " 인 원의 넓이는" + (radius*radius*3.14) + "이다." );

// 초를 입력하면 분과 초로 표시하는 프로그램. 예를 들어, 200초를 입력하면 3분 20초로 표현하라 
let time = 200;
let sec = time%60;
let min = (time-sec)/60;

console.log( min + "분" + sec + "초");

// 분(min)을 입력 하면, 일, 시간, 분으로 출력하는 프로그램을 만들어라.
// (예 : 1550분은 1일 1시간 50분)
let time_min = 1550;
let day = (time_min/(60*24));
let hour = (time_min-(60*24))/60;
let min2 = (time_min-(60*24))%60;

console.log( parseInt(time_min) + " 분은 " + parseInt(day) + " 일 " + parseInt(hour) + " 시간 " + min2 + " 분 ");

// 1부터 n까지의 합은n(n+1)/2로 주어진다. 1부터 100까지의 합을 구하여 출력하는 프로그램을 작성하고 실행하라.
let num3 = 100;

function sum(num3){
    //return num3*(num3+1)/2
    if(num3 == 1){
        return 1;
    }
    return num3+sum(num3-1)
}

let result = sum(num3);

console.log(result);

// 판매자가 딸기와 포도를 판매하고 있다. 포도 한 알의 무게는 75g이고 딸기 한 알의 무게는
// 113.5g이다. 사용자로부터 포도 알의 개수와 딸기의 개수를 입력 받아 총 무게를 계산하여 출력하는
// 프로그램을 작성하고 실행하라.
let grape = 5;
let Strawberry = 10;

console.log((grape*75 + Strawberry * 113.5)+"g");
