const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Введите текст: ', (text) => {
  rl.question('Введите имя файла: ', (fileName) => {
    fs.writeFile(fileName, text, (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
      } else {
        console.log(`Файл "${fileName}" успешно записан.`);
      }
      rl.close();
    });
  });
});