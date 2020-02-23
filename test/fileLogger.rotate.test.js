'use strict'

const Logger = require('../index');

const logger = new Logger({
  dir: './log',
  rotate: true,
  disableConsole: true
});

logger.info('fileLogger info', 'any', { name: 'zfx' });
logger.warn('fileLogger warn', 'any', 'any');
logger.error('fileLogger error', 'any', new Error('test'), 'any');