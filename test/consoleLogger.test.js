'use strict'

const Logger = require('../index');

const logger = new Logger({
  logToFile: false
});

logger.info('consoleLogger info');
logger.warn('consoleLogger warn');
logger.error('consoleLogger error');