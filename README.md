# logger
logger for nodejs

## Install

```sh
$ npm i @zhangfuxing/logger
```  

Node.js 12+ required (Because of use Class private fields)

## options
When isTTY is false, logger will not write to terminal.

### constructor  
* `dir` optional, Log folder path, if it is given, it will log to file
* `rotate` optional, Whether cut logs by day
  - default: false
* `disableConsole` optional, disable write to terminal
  - default: false

### info  
* `args` The message to write  
```ts  
info(...args: any[]): void;
``` 

### warn  
* `args` The message to write  
```ts  
warn(...args: any[]): void;
``` 

### error
* `args` The message to write  
```ts  
error(...args: any[]): void;
``` 

### disable 
disable write to terminal and file for unit testing  
 
## Useage  

### console logger  

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger();

logger.info('consoleLogger info', { name: 'zfx' });
logger.warn('consoleLogger warn', 1, 'any');
logger.error('consoleLogger error', new Error('test'));
```  

![consoleLogger](./screenshots/consoleLogger.png)  

### file and console logger  

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log'
});

logger.info('fileLogger info', 'any', { name: 'zfx' });
logger.warn('fileLogger warn', 'any', 'any');
logger.error('fileLogger error', 'any', new Error('test'), 'any');
```  

![fileLogger](./screenshots/fileLogger.png) 

### file logger only

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log',
  disableConsole: true
});

logger.info('fileLogger info', 'any', { name: 'zfx' });
logger.warn('fileLogger warn', 'any', 'any');
logger.error('fileLogger error', 'any', new Error('test'), 'any');
```  

### file logger cut by day

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log',
  rotate: true 
});

logger.info('fileLogger info', 'any', { name: 'zfx' });
logger.warn('fileLogger warn', 'any', 'any');
logger.error('fileLogger error', 'any', new Error('test'), 'any');
```  

![byDay](./screenshots/fileLogger.rotate.png)  

More screenshots in the `screenshots` folder.

## disable for unit testing  
disable write to terminal and file for unit testing 

consoleLogger.js
```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger();

module.exports = logger
```

fileLogger.js
```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log'
});

module.exports = logger
```

xx.test.js
```js
const consoleLogger= require('xx/consoleLogger');
const fileLogger= require('xx/fileLogger');

consoleLogger.disable();
fileLogger.disable();
```

## Test

```sh
$ npm test
```  

More test file in the `test` folder.