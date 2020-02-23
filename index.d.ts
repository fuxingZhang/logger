// Type definitions

interface Options {
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
  constructor(options?: Options);

  /**
   * print info message 
   * 
   *  `args` The message to write  
   */
  info(...args: any[]): void;

  /**
   * print warn message 
   * 
   *  `args` The message to write  
   */
  warn(...args: any[]): void;

  /**
   * print error message 
   * 
   *  `args` The message to write  
   */
  error(...args: any[]): void;

  /**
   * disable current log (file and console)
   */
  disable(): void;

  /**
   * restore previous log configuration (file, console or both)
   */
  enable(): void;

  /**
   * disable write to terminal
   */
  disableConsole(): void;

  /**
   * enable write to terminal
   */
  enableConsole(): void;

  /**
   * disable write to file
   */
  disableFile(): void;

  /**
   * enable write to file
   */
  enableFile(): void;
}

export = Logger