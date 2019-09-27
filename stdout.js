'use strict'

const isTTY = process.stdout.isTTY;
const eol = require('os').EOL;  // \n on POSIX, \r\n on Windows

/**
 * print to terminal
 * 
 * @param {String} chunk data to write
 */
function stdout(chunk) {
  process.stdout.write(`${chunk}${eol}`);
}

function Null() { }

module.exports = isTTY ? stdout : Null