'use strict'

const Logger = require('../index');

const logger = new Logger({
  dir: './log',
  disableConsole: true
});

logger.info('fileLogger info');
logger.warn('fileLogger warn');
logger.error('fileLogger error');