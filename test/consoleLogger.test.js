'use strict'

const Logger = require('../index');

const logger = new Logger();

logger.info('consoleLogger info', { name: 'zfx' });
logger.warn('consoleLogger warn', 1, 'any');
logger.error('consoleLogger error', new Error('test'));