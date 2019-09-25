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
      console.error('this.#stream error: ', err);
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

  /**
   * @public
   */
  end() {
    if(this.#stream) {
      this.#stream.removeAllListeners('error');
      this.#stream.end();
      // console.log(`${this.#stream.path} stream was closed`);
      this.#stream = void 0;
    }
  }
}

module.exports = Writable