const fs = require('fs');

console.time('readFileSync');
const data = fs.readFileSync('README.md', 'utf8');
console.log(data);
console.timeEnd('readFileSync');

// avg time 4.136s