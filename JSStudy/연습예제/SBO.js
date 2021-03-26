// 기본 데이터 타입 선언
let num = 100;
let str = "대한미국";
let tf = true;

console.log(typeof num); // -> number
console.log(typeof str); // -> string
console.log(typeof tf);  // -> boolean

// 객체 데이터 타입 변수 선언
let num2 = new Number(100);
let str2 = new String("대한민국");
let tf2 = new Boolean(true);

console.log(typeof num2); // -> object
console.log(typeof str2); // -> object
console.log(typeof tf2);  // -> object

// 2) 자동 변환
//    ㆍ기본 데이터 타입의 속성 또는 메소드를 사용하면 기본 자료형이 자동으로 객체로 변환 됨.
let str3 = `진영이:잘생김`;
console.log(str3.split(`:`));

let str4 = new String(`멍충우:못생김`);
//console.log(str4.split(`:`));

// 기본 타입은 객체가 아니므로 속성과 메소드 추가 불가
// str3.method = function() { // -> 오류
//     console.log(`method`);
// }

// str3.method();

str4.method = function() { 
    console.log(`method`);
}

str4.method();

// 기본 데이터 타입에 프로토타입으로 메소드 부여
let num3 = 100;

// 메소드 추가
Number.prototype.print = function () {
    console.log(`Number.prototype.print`);
}

num3.print();

// ●Number 객체 Property
// ㆍ MAX_VALUE             
// ㆍ MIN_VALUE
// ㆍ NaN
// ㆍ POSITIVE_INFINITY
// ㆍ NEGATIVE_INFINITY

// ●Number 객체 메소드
// ㆍtoExponetial(); --> 숫자를 지수 표시로 나타낸 문자열로 리턴
// ㆍtoFixed();      --> 숫자를 고정소수점 표시로 나타낸 문자열로 리턴
// ㆍtoPrecision();  --> 숫자를 길이에 따라 지수 표시 OR 고정 소수점 표시로 나타낸 문자열로 리턴

let num4 = 3.17213;

console.log(num4.toFixed(1));
console.log(num4.toFixed(4));

// ●String 객체 Property
// ㆍlength 

// ●String 객체 메소드
// ㆍcharAt(position)             -->  position에 위치한 문자 리턴 
// ㆍcharCodeAt(position)         -->  position에 위치하는 문자의 유니코드 번호 리턴
// ㆍconcat(str)                  -->  str을 현재 문자열 뒤에 붙여서 리턴
// ㆍlndexOf(str, position)       -->  앞에서부터 str과 일치하는 문자열의 위치리턴]
// ㆍreplace(regExp, str)         -->  regExp를 str로 바꾼 뒤 리턴
// ㆍsearch(regExpstr)            -->  regExp와 일치하는 문자열의 위치를 리턴
// ㆍslice(start, end)            -->  특정위치의 문자열을 추출해서 리턴
// ㆍsplit(sep, limit)            -->  sep로 문자열을 분리해서 limit개수 만큼 리턴
// ㆍsubstr(start,count)          -->  start부터 count만큼 문자열을 잘라서 리턴
// ㆍsubstring(start, end)        -->  start부터 end까지 문자열을 잘라서 리턴
// ㆍtoLowerCase()/toUpperCase()  -->  문자열을 소/대문자로 바꾸어 리턴

let string1 = `대한민국`;
let string2 = new String(`대한민국`);

// ●Date 객체

// ㆍnew Data() --> 현재 날짜와 시간으로 Date 객체 생성
// ㆍnew Date(<유닉스 타임>) --> 유닉스 타임으로 Date 객체 생성
// ㆍnew Date(<시간 문자열>) --> 문자열로 Date 객체 생성
// ㆍnew Date(y,m-1,d,h,M,s,ms) --> 시간요소를 기반으로 Date 객체 생성

