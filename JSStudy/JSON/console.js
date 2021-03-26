const str = `abc`;

const num = 1;

const boolean = true;

const obj = {
    outside : {
        inside : {
            key : `valude`,
        },
    },
};

console.time(`전체시간`);
console.log("테스트1");
console.log(str, num, boolean);
console.error(`에러 발생`);

console.table([{name:`제로`, birth:1994},
{name:`hero`, birth:1998}]);

console.dir(obj, {colors:false, depth:2});
console.dir(obj, {colors:true, depth:1});

console.time(`시간측정`);
for(let i = 0; i < 1000000; i++){
}
    console.timeEnd(`시간측정`);

function b(){console.trace(`추적`);}
function a() {b();}

a();

console.timeEnd(`전체시간`);
