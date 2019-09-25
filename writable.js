'use strict'

const fs = require('fs');

class Writable {
  #stream;

  /**
   * @constructor
   * @param {String} path file path
   */
  constructor(path) {
    this.#stream = Writable.createStream(path);
    
    this.#stream.once('error', err => {
      console.error(err);
      this.#stream.end();
      this.#stream = Writable.createStream(path);
    });
  }

  /**
   * @private
   * @param {String} path file path
   */
  static createStream(path) {
    return fs.createWriteStream(path, { flags: 'a' });
  }

  /**
   * @public
   * @param {String} chunk data to write
   */
  write(chunk) {
    this.#stream.write(`${chunk}\r\n`);
  }
}

module.exports = Writable