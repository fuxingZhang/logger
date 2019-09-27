'use strict'

const Logger = require('../index');

const logger = new Logger({
  dir: './log',
  rotate: true
});

logger.info('fileLogger info');
logger.warn('fileLogger warn');
logger.error('fileLogger error');