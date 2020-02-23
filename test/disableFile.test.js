'use strict'

const Logger = require('../index');

const logger = new Logger({
  dir: './log',
  disableConsole: true
});

logger.info('file enable');
logger.info('console will be disabled, should not see "file disbaled" below ===>');
logger.disableFile();
logger.info('file disbaled');
logger.enableFile();
logger.info('file enabled, you can see me');