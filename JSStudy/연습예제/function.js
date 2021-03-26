// // ●parseInt() 함수
// //  >> 문자열 or 실수를 정수로 변환

// // ●parseFloat() 함수
// //  >> 문자열을 실수로 변환

// let a = "10";
// let b = "3.14";
// let c = "만5000";

// // ㆍparseInt()의 기본적인 사용
// console.log(parseInt(a));

// // ㆍparseInt(), parseFloat() 차이
// console.log(parseInt(b));
// console.log(parseFloat(b));

// // ㆍ문자와 숫자가 섞인 형태 
// //   >> 문자를 만나면 함수 종료  ex) "5000만" = 5000,   "만5000" = NaN
// console.log(parseInt(c));

// // ●타이머 함수
// //  ㆍsetTimeout(함수, 시간)  - 특정 시간 후에 함수를 실행(msec)
// //  ㆍsetInterval(함수, 시간) - 특정 시간 마다 함수를 실행(msec)
// //  ㆍclearInterval(id)      - Interval 함수를 제거

// // ㆍ1초후 실행
// setTimeout(function(){
//   console.log("1초 지남");
// }, 1000);

// // ㆍ1초 마다 실행 -> Ctrl+C로 중지
// setInterval(function(){
//  console.log("1초 경과");
// }, 1000);





// 내가 원한.ver     --> 청우 버젼이랑 비교해서 왜 그런지 생각 해봐야 할 듯
// var power = (x) => x = x*x;
// var x = 2
// setInterval(() => {
//     x =power(x)
//     console.log(x);
// }, 1000);


// // 청우 여진.ver
// var xx =2;
// var cnt = 0;
// let power=setInterval(function(x=xx++){
//     console.log(x*x," ",++cnt,'초 지남');
// },1000);


// let tid = setInterval(function(){
//   console.log("1초 경과");
// }, 1000);
// // ㆍ3초 후 tid 제거
// setTimeout(function(){
//   clearInterval(tid);
// }, 3000);


// // ●함수선언
// // ㆍ기본 함수 선언
// function func_name(params){
//   console.log("기본 함수 선언 형식")
// }

// // ㆍ익명 함수 선언 형식
// let func_name2 = function(params){
//   console.log("익명 함수 선언 형식")
// }

// // ㆍ화살표 함수 선언 형식[ECMAScript6]
// let func_name3 = (params) => {
//   console.log("화살표 함수 선언 형식")
// }


// // 1)
// var hi = function(){
//   return '안녕하세요?';
// }
// hi();
// // 위와 같다
// let hi2 = () => '안녕하세요?';
// hi2();


// // 2)
// var greet = function(name){
//   return `못생긴` + name + `님 , 안녕하세요?`;
// }
// console.log(greet(`멍청우`));
// // 위와 동일
// let greet2 = name => `더러운 ${name}님, 안녕하세요?`;
// console.log(greet2(`멍청우`));

// // 3)
// var add = function(a,b){
//   return a+b;
// }
// add(10, 20);
// // 위와 마찬가지
// let add2 = (a,b) => a+b;
// add2(2,5);

