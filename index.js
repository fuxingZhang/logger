'use strict'

const fs = require('fs');
const colors = require('@zhangfuxing/colors/fn');
const path = require('path');
const write = require('./write');
const stdout = require('./stdout');
const eol = require('os').EOL;

class Logger {
  /**
   * When isTTY is true, logger writes to STDOUT. Otherwise it will not write to STDOUT
   * Writing to the terminal has nothing to do with whether or not to write to the file.
   * 
   * @constructor
   * @param {String} dir optional, if the folder path is given, it will log to file
   * @param {Boolean} rotate optional, Whether rotate logs by day, default: false
   */
  constructor({ dir, rotate = false } = {}) {
    this.rotate = rotate;
    if (typeof rotate !== 'boolean') throw new TypeError('rotate must be boolean');
    if (dir !== undefined) {
      this.dir = path.resolve(dir);
      Logger.init(this.dir);
    }
  }

  /**
   * Check if the folder exists
   * 
   * @private
   * @param {String} dir 
   */
  static init(dir) {
    try {
      fs.accessSync(dir);
      stdout(`${Logger.getInfo()} Log folder exists`);
    } catch (error) {
      stdout(`${Logger.getWarn()} Log folder does not exist`);
      try {
        fs.mkdirSync(dir, { recursive: true });
        stdout(`${Logger.getInfo()} Log folder create success`);
      } catch (error) {
        stdout(`${Logger.getError()} Log folder create failed`);
      }
    }
    stdout(`${Logger.getInfo()} Log folder: '${dir}'`);
  }

  /**
   * Print info message
   * 
   * @param {String} message 
   */
  async info(message) {
    stdout(`${Logger.getInfo()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'info',
      message,
      rotate: this.rotate
    });
  }

  /**
   * Print warn message
   * 
   * @param {String} message 
   */
  async warn(message) {
    stdout(`${Logger.getWarn()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'warn',
      message,
      rotate: this.rotate
    });
  }

  /**
   * Print error message
   * 
   * @param {String} message 
   */
  async error(message) {
    stdout(`${Logger.getError()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'error',
      message,
      rotate: this.rotate
    });
  }

  /**
   * @private
   * @param {String} dir 
   * @param {String} type 
   * @param {String} message 
   * @param {Boolean} rotate 
   */
  static async write({ dir, type, message, rotate }) {
    const date = Logger.getDate();
    const filename = rotate ? `${date}_${type}` : type;
    const path = `${dir}/${filename}.log`;
    const chunk = `${Logger.getNow()} ${message}${eol}`;

    await write(path, chunk);
  }

  static getInfo() {
    return colors.green(`${Logger.getNow()} Info:`);
  }

  static getWarn() {
    return colors.green(Logger.getNow()) + colors.yellow(` Warn:`);
  }

  static getError() {
    return colors.green(Logger.getNow()) + colors.red(` Error:`);
  }

  static getNow() {
    return new Date().toLocaleString('zh', { hour12: false });
  }

  static getDate() {
    return new Date().toLocaleDateString();
  }
}

module.exports = Logger