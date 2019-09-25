// Type definitions

interface Options {
  logToFile?: boolean;
  dir?: string;
  byDay?: boolean;
}

declare class Logger {
  /**
   * Options:
   *   - `logToFile` optional, Whether to write to a file, default:false
   *   - `dir` optional, log folder location, default: './log'
   *   - `byDay` optional, Whether rotate logs by day, default: false
   */
  constructor(options: Options);

  /**
   * print info message 
   * 
   *  `message` The message to write  
   */
  info(message: string): void;

  /**
   * print warn message 
   * 
   *  `message` The message to write  
   */
  warn(message: string): void;

  /**
   * print error message 
   * 
   *  `message` The message to write  
   */
  error(message: string): void;
}

export = Logger