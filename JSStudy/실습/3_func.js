// 함수를 이용하여 파라미터로 전달된 정수의 약수를 구하여 반환하는 프로그램을 작성하고 
// 실행하라
let admix = function(param) {
    var ret = '1 ';
    
    for(let i = 2; i < param; i++){
        if(param%i == 0){
            ret = ret + String(i) + ' ';
        }
    }
    ret = ret + String(param);
    return ret;
}
let num = 56;

console.log(admix(num))

// 함수를 이용하여 10진수를 2진수로 변환하는 프로그램을 작성하고 실행하라.
// ● dec2bin_int(n) : 정수 n을 2진수로 변환
let dec2bin_int = (param) => {
    var ret = ''
    while(param > 0){
        ret = String(param%2) + ret;
        param = parseInt(param/2);
    }
    return ret;
}
console.log(dec2bin_int(10));

// ● dec2bin_float(d) : 0보다 크고 1보다 작은 실수 d를 2진수로 변환
let dec2bin_float = (param) => {
    if(param < 0 || 1 < param){
        return "Error";
    }
    var ret = '0.'
    while(param > 0){
        ret = ret + parseInt(param *2/1);
        param = (param*2)%1;
    }
    return ret;
}
console.log(dec2bin_float(1.375));

// ● desc2bin(num) : 실수 numdmf dec2bin_int()와 dec2bin_float()함수를 이용하여 2진수로 변환
function desc2bin(param) {
    let num1 = parseInt(param/1);
    let num2 = param%1;

    return Number(dec2bin_int(num1))+ Number(dec2bin_float(num2));
}
console.log(desc2bin(10.375));

// 재귀함수를 이용하여 1 ~ 100의 합을 구하는 프로그램을 작성하고 실행하라.
let num3 = 100;

let sum = (num3) => {
    //return num3*(num3+1)/2
    if(num3 == 1){
        return 1;
    }
    return num3+sum(num3-1)
}

let result = sum(num3);

console.log(result);
