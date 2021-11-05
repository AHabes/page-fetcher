const request = require('request');
const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const args = process.argv.slice(2);
const url = args[0];
const file = args[1];

const write = (file, body) => {
  fs.writeFile(file, body, (err) => {
    if (err) throw err;
    const fileStats = fs.statSync(file);
    console.log(`Downloaded and saved ${fileStats.size} bytes to ${file}`);
    process.exit();
  });
};

request(url, (error, response, body) => {
  fs.stat(file, (error) => {
    if (error == null) {
      rl.question('file exists, to overwrite press y', answer => {
        if (answer.toLowerCase() === 'y') {
          write(file, body);
        } else {
          process.exit();
        }
      });
    } else {
      write(file, body);
    }
  });
});

