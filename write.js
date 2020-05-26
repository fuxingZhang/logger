'use strict'

const Writable = require('./writable');
const { INFO, WARN, ERROR } = require('./types');

const map = new Map();
const typePathDict = {
  [INFO]: '',
  [WARN]: '',
  [ERROR]: ''
};

/**
 * @param {String} path file location
 * @param {String} chunk data to write
 * @param {String} type type
 */
function write(path, chunk, type) {
  if (map.has(path)) {
    return map.get(path).write(chunk);
  }

  const _path = typePathDict[type];
  if (_path) {
    map.get(_path).end();
    map.delete(_path);
  }
  typePathDict[type] = path;

  const writable = new Writable(path);
  map.set(path, writable);
  writable.write(chunk);
}

module.exports = write