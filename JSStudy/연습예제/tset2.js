// let run = () => {
//     console.log(`3초후 실행`);
// }

// console.log('start');
// setTimeout(run, 3000);

// console.log('end');


try{
    // const array = new Array(2000);

    //throw `강제 예외를 발생시켰습니다.`;

    const error = new Error(`Message`);
    error.name = `My Error Name`;
    error.message = `My Error Message`;

    throw error;

} catch(error){
     console.log(`${error.name}예외가 발생했습니다.`);
     console.log(`message : ${error.message}`);

    //console.log(`예외가 발생했습니다.`);
    //console.log(exception);


}finally{
    console.log(`finally 구문이 실행되었습니다.`);
}