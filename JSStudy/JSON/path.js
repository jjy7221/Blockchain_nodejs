const path = require(`path`);

console.log(`path.sep :`, path.sep);

console.log(`path.delimiter : `, path.delimiter);

console.log(`path.dirname() : `, path.dirname(__filename));

console.log(`path.extname() : `, path.extname(__filename));

console.log(`path.parse() : `, path.parse(__filename));

console.log(`path.format() : `, path.format({
    dir : `C:\\nodestudy`,
    name : `path`,
    ext : `,js`,
}));

const tstr = `c:\\test1\\test2/test3/test4`;

console.log(`path.normalize() : `, path.normalize(tstr));
console.log(`path.isAbsolute(./home) : `, path.isAbsolute(`./home`));