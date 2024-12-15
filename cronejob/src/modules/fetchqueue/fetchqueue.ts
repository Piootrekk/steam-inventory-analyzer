class FetchQueue {
  private proxies: string[] | string | undefined;
  private steamIds: string[] | string;
  private interval: number;

  constructor(
    proxies: string[],
    steamIds: string[] | string,
    interval: number
  ) {
    this.proxies = proxies;
    this.steamIds = steamIds;
    this.interval = interval;
  }
}

export default FetchQueue;
