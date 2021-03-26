// 윤년 확인 프로그램
// ㆍ 년도가 4로 나뉘어지며 100으로 나뉘어지지 않거나
// ㆍ 400으로 나뉘어지면 윤년이다.

let year = 2021;

if(year%4 == 0 && year%100 != 0 || year%400 == 0){
    console.log("윤년O");
}
else{
    console.log("윤년X");
}

// cm 단위의 길이를 변수로 설정한다. 설정 값이 음수이면 "잘못 설정되었습니다"라는
// 메세지를 출력하고 양수이면 길이를 인치로 변환하여 출력하는 프로그램을 작성하라.
// 1인치 = 2.54cm
let num1 = 1;

if(num1 < 0){
    console.log("잘못 설정되었습니다.");
}
else{
    console.log( (num1 * 2.54) + "cm");
}

// 현재 시간을 나타내는 1~12의 숫자를 변수로 설정한다. 또 "am" 혹은
// "pm"을 설정하고 경과 시간을 나타내는 값을 설정한다. 이로부터 최종 시간이
// 몇 시인지 출력하는 프로그램을 작성하라.

let hour = 3;
let noon = 'pm'
let after_hour =100;

if(noon === 'pm'){
    if(((hour+after_hour)/12)%2 == 0 ){
        console.log(((hour+(after_hour%12))%12)+"P.M");
    }
    else{
        console.log(((hour+(after_hour%12))%12)+"A.M");
    }
}
else{
    if(((hour+after_hour)/12)%2 == 0 ){
        console.log(((hour+(after_hour%12))%12)+"A.M");
    }
    else{
        console.log(((hour+(after_hour%12))%12)+"P.M");
    }
}



