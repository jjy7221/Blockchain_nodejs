const fs = require(`fs`).promises;

fs.writeFile(`./writeme.txt`, 'test용 글자를 써봅시당')
.then(()=>{
    return fs.readFile(`./writeme.txt`);
})
.then((data) => {
    console.log(data.toString());
})
.catch((err) => {
    console.error(err);
})