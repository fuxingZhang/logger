'use strict'

const fs = require('fs');
const util = require('util');
const colors = require('@zhangfuxing/colors/fn');
const path = require('path');
const write = require('./write');
const Dater = require('@zhangfuxing/date');
const stdout = require('./stdout');
const eol = require('os').EOL;
const noop = () => void 0;

class Logger {
  #stdout;
  #rotate;
  #dir;
  #info = this.info;
  #warn = this.warn;
  #error = this.error;
  #write = Logger.write;

  /**
   * When isTTY is false, logger will not write to terminal.
   * 
   * @constructor
   * @param {String} dir optional, if the folder path is given, it will log to file
   * @param {Boolean} rotate optional, Whether rotate logs by day, default: false
   * @param {Boolean} disableConsole optional, disable write to terminal, default: false
   */
  constructor({ dir, rotate, disableConsole = false } = {}) {
    if (rotate !== undefined) {
      if (typeof rotate !== 'boolean') {
        throw new TypeError('rotate must be boolean');
      }
      this.#rotate = rotate;
    }

    if (disableConsole !== undefined && typeof disableConsole !== 'boolean') {
      throw new TypeError('disableConsole must be boolean');
    }
    this.#stdout = disableConsole === true ? noop : stdout;

    if (dir !== undefined) {
      if (typeof dir !== 'string') throw new TypeError('dir must be string');
      this.#dir = path.resolve(dir);
      Logger.init(this.#dir, this.#stdout);
    }
  }

  /**
   * Check if the folder exists
   * 
   * @private
   * @param {String} dir 
   * @param {Function} stdout 
   */
  static init(dir, stdout) {
    if (fs.existsSync(dir)) return;
    stdout(`${Logger.getWarn()} Log folder does not exist`);
    try {
      fs.mkdirSync(dir, { recursive: true });
      stdout(`${Logger.getInfo()} Log folder create success`);
    } catch (error) {
      stdout(`${Logger.getError()} Log folder create failed`);
    }
  }

  /**
   * Print info message
   * 
   * @param {...*} args 
   */
  info(...args) {
    const message = util.formatWithOptions({ colors: true }, ...args);
    this.#stdout(`${Logger.getInfo()} ${message}`);

    if (this.#dir !== undefined) Logger.write({
      dir: this.#dir,
      type: 'info',
      message: util.format(...args),
      rotate: this.#rotate
    });
  }

  /**
   * Print warn message
   * 
   * @param {...*} args 
   */
  warn(...args) {
    const message = util.formatWithOptions({ colors: true }, ...args);
    this.#stdout(`${Logger.getWarn()} ${message}`);

    if (this.#dir !== undefined) Logger.write({
      dir: this.#dir,
      type: 'warn',
      message: util.format(...args),
      rotate: this.#rotate
    });
  }

  /**
   * Print error message
   * 
   * @param {...*} args 
   */
  error(...args) {
    const message = util.formatWithOptions({ colors: true }, ...args);
    this.#stdout(`${Logger.getError()} ${message}`);

    if (this.#dir !== undefined) Logger.write({
      dir: this.#dir,
      type: 'error',
      message: util.format(...args),
      rotate: this.#rotate
    });
  }

  /**
   * @private
   * @param {String} dir 
   * @param {String} type 
   * @param {String} message 
   * @param {Boolean} rotate 
   */
  static write({ dir, type, message, rotate }) {
    const date = Logger.getDate();
    const filename = rotate === true ? `${date}_${type}` : type;
    const path = `${dir}/${filename}.log`;
    const chunk = `${Logger.getNow()} ${message}${eol}`;

    write(path, chunk);
  }

  /**
   * disable  write to file and terminal
   * @public
   */
  disable() {
    this.info = noop;
    this.warn = noop;
    this.error = noop;
  }

  /**
   * restore previous log configuration: file, terminal or both
   * @public
   */
  enable() {
    this.info = this.#info;
    this.warn = this.#warn;
    this.error = this.#error;
  }

  /**
   * disable write to terminal
   * @public
   */
  disableConsole() {
    this.#stdout = noop;
  }

  /**
   * enable write to terminal
   * @public
   */
  enableConsole() {
    this.#stdout = stdout;
  }

  /**
   * disable write to file
   * @public
   */
  disableFile() {
    Logger.write = noop;
  }

  /**
   * enable write to file
   * @public
   */
  enableFile() {
    Logger.write = this.#write;
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
    return new Dater().toLocaleString();
  }

  static getDate() {
    return new Dater().toLocaleDateString();
  }
}

module.exports = Logger