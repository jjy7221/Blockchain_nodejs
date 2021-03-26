const {odd, even} = require('./var');
const checkNum = require('./func');

function checkString(str){
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNum(11));

console.log(checkString(`hello world`));