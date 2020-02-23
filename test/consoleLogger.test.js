'use strict'

const Logger = require('../index');

const logger = new Logger();
logger.info('consoleLogger info', { name: 'zfx' });
logger.warn('consoleLogger warn', 1, 'any');
logger.error('consoleLogger error', new Error('test'));

logger.info('console will be disabled, should not see "console disabled" below ===>');
logger.disableConsole();
logger.info('console disabled');
logger.enableConsole();
logger.info('console enabled, you can see me');