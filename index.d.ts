// Type definitions
/// <reference types="node" />

export interface Options {
  dir?: string;
  rotate?: boolean;
  disableConsole?: boolean;
}

declare class Logger {
  /**
   * When isTTY is false, logger will not write to terminal.
   * 
   * Options:
   *   - `dir` optional, Log folder path, if it is given, it will log to file
   *   - `rotate` optional, Whether rotate logs by day, default: false
   *   - `disableConsole` optional, disable write to terminal, default: false
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

  /**
   * disable write to terminal and file for unit testing
   */
  disable(): void;
}

export = Logger