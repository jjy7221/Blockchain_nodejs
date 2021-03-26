// 임의의 두 수를 각각 변수에 설정하고 두 변수의 최대 공약수를 구하라.
// ㆍ 큰 수를 작은 수로 나눈 나머지를 구하라
// ㆍ 큰 수를 작은 수로 대체하고 작은 수는 나머지로 대체하라
// ㆍ 작은 수가 0이 될 때까지 이 과정을 반복하라. 마지막 큰 수가 최대 공약수이다.

let num1 = 30;
let num2 = 20;

if(num1 > num2){
    let temp = num1;
    num1 = num2;
    num2 = temp;
}

while(num1 != 0){
    let nam = num2%num1
    num2 = num1
    num1 = nam;
}
console.log(num2);

// 임의의 정수를 변수로 설정하고 그 수의 약수를 모두 출력하는 프로그램을 작성하라.
// m%n = 0 잉면 n은 m의 약수이다. 예를 들어 12의 약수는 1, 2, 3, 4, 6, 12이다.

let num3 = 15;

var ret = ''
for(let i = 1; i <= num3; i++){
    if(num3%i == 0){
        ret = ret + String(i)+' ';
    }
}
console.log(ret);

// 임의의 정수 n을 설정하고 2부터 n까지의 모든 소수를 출력하라. 소수는 1과 자기자신만으로 
// 나누어 떨어지는 수이다.

let num4 = 100;

var ret = '2 ';

for(let i = 2; i < num4; i+=2){
    //let cnt = 0;
    for(var j = 2; j < i+1; j++){
        if((i+1)%j == 0){
            //cnt ++;
            break;
        }
    }
    // if(cnt == 0){
    //     ret = ret + String(i+1) + ' ';
    // }
    if((i+1) == j){
        ret = ret + String(i+1) + ' ';
    }
}
console.log(ret);