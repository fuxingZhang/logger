'use strict'

const isTTY = process.stdout.isTTY;
const eol = require('os').EOL;  

/**
 * print to terminal
 * 
 * @param {String} chunk data to write
 */
const stdout = chunk => process.stdout.write(`${chunk}${eol}`);

const noop = () => void 0;

module.exports = isTTY ? stdout : noop