// Type definitions
/// <reference types="node" />

export interface Options {
  dir?: string;
  rotate?: boolean;
}

declare class Logger {
  /**
   * When isTTY is true, logger writes to STDOUT. Otherwise it will not write to STDOUT
   * Writing to the terminal has nothing to do with whether or not to write to the file.
   * 
   * Options:
   *   - `dir`  optional, if the folder path is given, it will log to file
   *   - `rotate` optional, Whether rotate logs by day, default: false
   */
  constructor(option?: Options);

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