'use strict'

const Writable = require('./writable');

const map = new Map();
let infoPath, warnPath, errorPath;

/**
 * @param {String} path file location
 * @param {String} chunk data to write
 */
function write(path, chunk) {
  if (map.has(path)) return map.get(path).write(chunk);

  if (path.includes('info')) {
    if (infoPath) {
      map.get(infoPath).end();
      map.delete(infoPath);
    }
    infoPath = path;
  } else if (path.includes('warn')) {
    if (warnPath) {
      map.get(warnPath).end();
      map.delete(warnPath);
    }
    warnPath = path;
  } else if (path.includes('error')) {
    if (errorPath) {
      map.get(errorPath).end();
      map.delete(errorPath);
    }
    errorPath = path;
  } else {
    throw new Error('Unexpected file path');
  }

  const writable = new Writable(path);
  map.set(path, writable);
  writable.write(chunk);
}

module.exports = write