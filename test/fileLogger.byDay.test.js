'use strict'

const Logger = require('../index');

const logger = new Logger({
  logToFile: true,
  dir: './log',
  byDay: true
});

logger.info('fileLogger info');
logger.warn('fileLogger warn');
logger.error('fileLogger error');