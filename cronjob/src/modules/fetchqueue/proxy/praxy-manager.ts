import CustomError from "../../../config/error-converter";
import logger from "../../logger/logger-singleton";

class ProxyManager {
  private proxies: string[];
  private proxiesBackup: string[];
  private delay: number;
  private currentProxyIndex: number;
  private usedProxies: string[] = [];

  constructor(proxies: string[], proxiesBackup: string[], delay: number) {
    this.proxies = proxies;
    this.delay = delay;
    this.currentProxyIndex = 0;
    this.proxiesBackup = proxiesBackup;
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private roundRobinNext(): string | undefined {
    if (this.proxies.length === 0) return undefined;
    const proxy = this.proxies[this.currentProxyIndex];
    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
    return proxy;
  }

  private setUsedProxy(proxy: string): void {
    const index = this.proxies.indexOf(proxy);
    if (index !== -1) {
      const removedProxy = this.proxies.splice(index, 1)[0];
      this.usedProxies.push(removedProxy);
      console.log("--- INFO: Removing washed proxy");
    }
  }

  private restoreProxyFromBackup = (): void => {
    const proxyBackup = this.proxiesBackup.shift();
    if (proxyBackup) {
      this.proxies.push(proxyBackup);
      console.log("--- INFO: Swapping washed proxy");
    } else {
      console.log("--- INFO: No proxies in backup");
    }
  };

  public async executeRequestsInBatches<T>(
    tasks: ((proxy?: string) => Promise<T>)[],
    batchSize?: number
  ): Promise<(T | undefined)[]> {
    const results: (T | undefined)[] = [];
    const effectiveBatchSize =
      batchSize || this.proxies.length != 0 ? this.proxies.length : 1;

    for (let i = 0; i < tasks.length; i += effectiveBatchSize) {
      const batch = tasks.slice(i, i + effectiveBatchSize);

      const batchResults = await Promise.all(
        batch.map(async (task, index) => {
          const currentTaskIndex = i + index + 1;
          const totalTasks = tasks.length;
          console.log(`--- Processing task ${currentTaskIndex}/${totalTasks}`);
          const proxy = this.roundRobinNext();

          return task(proxy).catch((error: unknown) => {
            const err = new CustomError(error);
            console.log(err.getMessage);
            logger.addLogError(err.logError());
            if (err.getStatus !== 429) return undefined;
            if (proxy) {
              this.setUsedProxy(proxy);
            }
            if (this.proxiesBackup) {
              this.restoreProxyFromBackup();
              console.log("Proxies skipped cuz 429");
            }
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
