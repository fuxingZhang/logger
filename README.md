# logger
logger for nodejs

## Install

```sh
$ npm i @zhangfuxing/logger
```  

Node.js 12+ required (Because of use Class private fields)

## options

When isTTY is true, logger writes to STDOUT. Otherwise it will not write to STDOUT
Writing to the terminal has nothing to do with whether or not to write to the file.

### constructor  
* `dir`  optional, if the folder path is given, it will log to file
* `rotate` optional, Whether rotate logs by day
  - default: false

### info  
* `message` The message to write  

### warn  
* `message` The message to write  

### error
* `message` The message to write  


## Useage  

### console logger  

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger();

logger.info('consoleLogger info');
logger.warn('consoleLogger warn');
logger.error('consoleLogger error');
```  

![consoleLogger](./screenshots/consoleLogger.png)  

### file logger  

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log'
});

logger.info('fileLogger info');
logger.warn('fileLogger warn');
logger.error('fileLogger error');
```  

![fileLogger](./screenshots/fileLogger.png) 

### file logger cut by day

```js
const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './log',
  rotate: true 
});

logger.info('fileLogger info');
logger.warn('fileLogger warn');
logger.error('fileLogger error');
```  

![byDay](./screenshots/fileLogger.byDay.png)  

More screenshots in the `screenshots` folder.

## Test

```sh
$ npm test
```  