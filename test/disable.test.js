'use strict'

/**
 * fileLogger => disable => enable => fileLogger 
 * consoleLogger => disable => enable => consoleLogger 
 * fileLogger, consoleLogger => disable => enable => fileLogger, consoleLogger 
 */
const Logger = require('../index');
const consoleLogger = new Logger();
const fileLogger = new Logger({
  dir: './log',
  disableConsole: true
});
const bothLogger = new Logger({
  dir: './log'
});

// fileLogger => disable => enable => fileLogger 
fileLogger.info('print by fileLogger, should not see "fileLogger disabled"');
fileLogger.disable();
fileLogger.info('fileLogger disabled');
fileLogger.enable();
fileLogger.info('fileLogger enabled, should see me just in file');

// consoleLogger => disable => enable => consoleLogger 
consoleLogger.info('print by consoleLogger, should not see "consoleLogger disabled"');
consoleLogger.disable();
consoleLogger.info('consoleLogger disabled');
consoleLogger.enable();
consoleLogger.info('consoleLogger enabled, should see me just in terminal');

// fileLogger, consoleLogger => disable => enable => fileLogger, consoleLogger 
bothLogger.info('print by bothLogger, should not see "bothLogger disabled"');
bothLogger.disable();
bothLogger.info('bothLogger disabled');
bothLogger.enable();
bothLogger.info('bothLogger enabled, should see me both in file and terminal');