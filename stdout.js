const isTTY = process.stdout.isTTY;
const eol = require('os').EOL;  // \n on POSIX, \r\n on Windows

function stdout(chunk) {
  process.stdout.write(`${chunk}${eol}`);
}

function Null() { }

module.exports = isTTY ? stdout : Null