'use strict'

const fs = require('fs');
const colors = require('@zhangfuxing/colors/fn');
const path = require('path');
const write = require('./write');

class Logger {
  /**
   * @constructor
   * 
   * @param {Boolean} logToFile optional, Whether to write to a file, default:false
   * @param {String} dir optional, log folder location, default: './log'
   * @param {Boolean} byDay optional, Whether rotate logs by day, default: false
   */
  constructor({ logToFile = false, dir = './log', byDay = false } = {}) {
    this.logToFile = logToFile;
    this.dir = path.resolve(dir);
    this.byDay = byDay;
    if (typeof logToFile !== 'boolean') throw new TypeError('logToFile must be boolean');
    if (typeof byDay !== 'boolean') throw new TypeError('byDay must be boolean');
    if (logToFile) {
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
      console.log(`${Logger.getInfo()} Log folder exists`);
    } catch (error) {
      console.warn(`${Logger.getWarn()} Log folder does not exist`);
      try {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`${Logger.getInfo()} Log folder create success`);
      } catch (error) {
        console.error(`${Logger.getError()} Log folder create failed`);
      }
    }
    console.log(`${Logger.getInfo()} Log folder: '${dir}'`);
  }

  /**
   * Print info message
   * 
   * @param {String} message 
   */
  async info(message) {
    console.log(`${Logger.getInfo()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'info',
      message,
      byDay: this.byDay
    });
  }

  /**
   * Print warn message
   * 
   * @param {String} message 
   */
  async warn(message) {
    console.warn(`${Logger.getWarn()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'warn',
      message,
      byDay: this.byDay
    });
  }

  /**
   * Print error message
   * 
   * @param {String} message 
   */
  async error(message) {
    console.error(`${Logger.getError()} ${message}`);

    if (this.logToFile) Logger.write({
      dir: this.dir,
      type: 'error',
      message,
      byDay: this.byDay
    });
  }

  /**
   * @private
   * @param {String} dir 
   * @param {String} type 
   * @param {String} message 
   */
  static async write({ dir, type, message, byDay }) {
    const date = new Date().toLocaleDateString();
    const filename = byDay ? `${date}_${type}` : type;

    await write(`${dir}/${filename}.log`, `${Logger.getNow()} ${message}\r\n`);
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
}

module.exports = Logger