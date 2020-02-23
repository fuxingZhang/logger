'use strict'

const Logger = require('../index');

const logger = new Logger({
  disableConsole: true
});

logger.enableConsole();
logger.info('console enabled, you can see me');
logger.info('console will be disabled, should not see any below ===>');
logger.disableConsole();
logger.info('console disabled');
