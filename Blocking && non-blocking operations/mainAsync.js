const fs = require('fs');

console.time('readFile');
fs.readFile('README.md', 'utf8', (err, data) => {
  console.log(data); 
});
console.timeEnd('readFile');
// snachala pishet vremya, a potom vivodit text avg time near 1.3ms