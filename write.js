const Writable = require('./writable');

const map = new Map();

/**
 * @param {String} path file location
 * @param {String} chunk data to write
 */
function write(path, chunk) {
  if (map.has(path)) return map.get(path).write(chunk);
  const writable = new Writable(path);
  map.set(path, writable);
  writable.write(chunk);
}

module.exports = write