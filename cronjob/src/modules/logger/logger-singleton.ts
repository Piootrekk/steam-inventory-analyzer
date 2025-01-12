import { TErrorLog } from "./logger.type";

class Logger {
  protected timers: Map<string, number>;

  private errorLogs: TErrorLog[];
  private elapsedTimes: Map<string, number>;

  public constructor() {
    this.errorLogs = [];
    this.timers = new Map<string, number>();
    this.elapsedTimes = new Map<string, number>();
  }

  public addLogError(message: string, instance?: unknown) {
    this.errorLogs.push({
      time: new Date().toLocaleString(),
      message,
      inClass: instance,
    });
  }

  public startTimer(label: string) {
    if (this.timers.has(label)) {
      throw new Error(`Timer with label "${label}" is already running.`);
    }
    this.timers.set(label, Date.now());
  }

  public stopTimer(label: string): void {
    if (!this.timers.has(label)) {
      throw new Error(`No timer found for label "${label}".`);
    }
    const startTime = this.timers.get(label)!;
    const elapsed = Date.now() - startTime;
    this.timers.delete(label);
    console.log(`Timer "${label}" finished. Duration: ${elapsed} ms`);
    this.elapsedTimes.set(label, elapsed);
  }

  public get getErrorLogs() {
    return this.errorLogs;
  }

  public get getElapsedTimes() {
    console.log(this.elapsedTimes);
    return this.elapsedTimes;
  }
}

const logger = new Logger();

export default logger;
