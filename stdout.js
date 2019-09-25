const isTTY = process.stdout.isTTY;

function stdout(chunk) {
  process.stdout.write(chunk);
}

function Null() { }

module.exports = isTTY ? stdout : Null