const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите путь к файлу: ', (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));

  const absolutePath = path.resolve(filePath);

  console.log(`Имя файла без расширения: ${fileName}`);
  console.log(`Абсолютный путь к файлу: ${absolutePath}`);

  rl.close();
});