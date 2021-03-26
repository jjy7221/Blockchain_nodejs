// var num1 = 1;
// var num2 = 2;
// var result = 3;

// var string1 = num1 + ' Add ' + num2 + '는 \'' + result + '\'';
// console.log(string1);

// var string2 = `${num1} 더하기 ${num2}는 '${result}'`;
// console.log(string2);

// // ●Escape 문자
// // ㆍ\t     >> Tap
// // ㆍ\n     >> 개행
// // ㆍ\', \" >> 따옴표
// // ㆍ\\     >> 백슬래시

// // ●비교연산
// // ㆍ===    >> 데이터 타입과 값을 비교해서 true or false 반환

// // var   -> 중복 선언 가능, 함수범위
// // let   -> 중복 선언 불가, 블록범위
// // const -> 중복 선언 및 값 수정 불가, 블록범위

// // ●블록범위란?
// // function sum(){
// //   if(){
// //     var a = 10;
// //     let b = 20;
// //   }
// //   console.log(a);  >> C에서는 오류지만 Node.js에서는 오류가 뜨지 않는다(함수범위)
// //   console.log(b)); >> C에서와 마찬가지로 if문의 {} 벗어나면 소멸(블록범위)
// // }

// // ●typeof()함수
// typeof(10);
// // > 'number' -> 숫자

// typeof("Jin02는 너무너무 멋쪙! \(>.<)/");
// // > 'string' -> 문자열

// typeof(true);
// // > 'boolean' -> true/false

// typeof(function(){});
// // > 'function' -> 함수

// typeof({});
// // > 'object' -> 객체( '{}'로 감싸면 객체)

// typeof(undefined values);
// // > 'undefined' -> 정의되지 않은 변수

// // ●Number()함수 - typecasting
// console.log(Number("100"))
// // > 100
// console.log(Number("3.14"))
// // > 3.14
// console.log(Number("ture"))
// // > 1
// console.log(Number("false"))
// // > 0
// console.log(Number("Jin02는 태양계에서 제일 잘생겼뗘"))
// // NaN -> 숫자로 바뀌지 않는 경우

// // ●isNaN()함수
// let nn = Number("Jin02는 똑똑행");
// (nn==NaN)
// // > false
// console.log(isNaN(nn))
// // > true

// // ●Boolean()함수
// console.log(Boolean(0))
// // > false
// console.log(Boolean(1))
// // > true
// console.log(Boolean(""))
// // > flase
// console.log(Boolean(null))
// // > false
// console.log(Boolean(undefined values))
// // > false

// // ●String()함수
// console.log(String(0))
// // > "0"
// console.log(String(3.14))
// // > "3.14"
// console.log(String(ture))
// // > "true"
// console.log(String(NaN))
// // > "NaN"
// console.log(String(console))
// // > "[object Object]"