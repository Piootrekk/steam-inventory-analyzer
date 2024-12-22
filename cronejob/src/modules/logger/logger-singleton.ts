import { TErrorLog } from "./logger.type";

class Logger {
  private errorLogs: TErrorLog[];

  public constructor() {
    this.errorLogs = [];
  }

  public addLogError(message: string, instance?: unknown) {
    this.errorLogs.push({
      time: new Date().toLocaleString(),
      message,
      inClass: instance,
    });
  }

  public get getErrorLogs() {
    return this.errorLogs;
  }
}

const logger = new Logger();

export default logger;
