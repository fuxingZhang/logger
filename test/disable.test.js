'use strict'

const Logger = require('../index');

const consoleLogger = new Logger();

const fileLogger = new Logger({
  dir: './log'
});

consoleLogger.disable();
fileLogger.disable();

console.log('disbale ===>');

consoleLogger.info('consoleLogger info');
consoleLogger.warn('consoleLogger warn');
consoleLogger.error('consoleLogger error');

fileLogger.info('fileLogger info');
fileLogger.warn('fileLogger warn');
fileLogger.error('fileLogger error');