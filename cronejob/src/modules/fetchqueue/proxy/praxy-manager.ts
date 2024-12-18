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

  private getNextProxy(): string {
    const proxy = this.proxies[this.currentProxyIndex];
    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxies.length;
    return proxy;
  }

  public async executeRequestsInBatches<T>(
    tasks: ((proxy: string) => Promise<T>)[],
    batchSize?: number
  ): Promise<T[]> {
    const results: T[] = [];
    const effectiveBatchSize = batchSize || this.proxies.length;

    for (let i = 0; i < tasks.length; i += effectiveBatchSize) {
      const batch = tasks.slice(i, i + effectiveBatchSize);

      const batchResults = await Promise.all(
        batch.map((task) => {
          const proxy = this.getNextProxy();
          return task(proxy);
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
