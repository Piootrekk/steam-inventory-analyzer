import logger from "../../logger/logger-singleton";

class ProxyManager {
  private proxies: string[];
  private delay: number;
  private currentProxyIndex: number;

  constructor(proxies: string[], delay: number) {
    this.proxies = proxies;
    this.delay = delay;
    this.currentProxyIndex = 0;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private roundRobinNext(): string {
    const proxy = this.proxies[this.currentProxyIndex];
    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
    return proxy;
  }

  public async executeRequestsInBatches<T>(
    tasks: ((proxy: string) => Promise<T>)[],
    batchSize?: number
  ): Promise<(T | undefined)[]> {
    const results: (T | undefined)[] = [];
    const effectiveBatchSize = batchSize || this.proxies.length;

    for (let i = 0; i < tasks.length; i += effectiveBatchSize) {
      const batch = tasks.slice(i, i + effectiveBatchSize);

      const batchResults = await Promise.all(
        batch.map((task, index) => {
          const currentTaskIndex = i + index + 1;
          const totalTasks = tasks.length;
          console.log(`--- Processing task ${currentTaskIndex}/${totalTasks}`);
          const proxy = this.roundRobinNext();

          return task(proxy).catch((error) => {
            if (error instanceof Error) logger.addLogError(error.message);
            return undefined;
          });
        })
      );
      results.push(...batchResults);

      if (i + effectiveBatchSize < tasks.length) {
        console.log(`Waiting for ${this.delay} ms before next batch...`);
        await this.sleep(this.delay);
      }
    }

    return results;
  }
}

export default ProxyManager;
