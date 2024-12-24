import Inventory from "./inventory/inventory";
import { TInventoryDTO } from "./inventory/inventory.type";
import { TSupportedGames } from "./fetch/games.type";
import ProxyManager from "./proxy/praxy-manager";
import Market from "./market/market";
import { writeFileSync } from "fs";

class ScheduleFetch {
  private proxies: string[] | string;
  private inventories: Inventory[] = [];
  private proxyManager: ProxyManager;
  private fetchedInventories: TInventoryDTO[] = [];
  private delay: number;

  constructor(proxies: string[] | string | undefined, delay: number) {
    this.delay = delay;
    this.proxies = Array.isArray(proxies) ? proxies : proxies ? [proxies] : [];
    this.proxyManager = new ProxyManager(this.proxies, delay);
  }

  public addProfile(steamId: string, games: TSupportedGames[]) {
    const inventory = new Inventory(games, steamId);
    this.inventories.push(inventory);
  }

  public async fetchAllInventories() {
    const tasks: ((proxy?: string) => Promise<TInventoryDTO>)[] = [];
    this.inventories.forEach((inventory) => {
      tasks.push(...inventory.getTasks);
    });
    const responseInventory = await this.proxyManager.executeRequestsInBatches(
      tasks
    );
    const responseWithoutUndefined = responseInventory.filter(
      (entity) => entity !== undefined
    );
    this.fetchedInventories = responseWithoutUndefined;
  }

  public async fetchAllPrices() {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    console.log("FETCHING PRICES");
    const marketPrices = new Market(this.fetchedInventories);
    const responseInventory = await this.proxyManager.executeRequestsInBatches(
      marketPrices.getTasks
    );
    const responseWithoutUndefined = responseInventory.filter(
      (entity) => entity !== undefined
    );
    this.fetchedInventories = this.fetchedInventories.map((inventory) => {
      return {
        ...inventory,
        inventory: inventory.inventory.map((item) => {
          const priceData = responseWithoutUndefined.find(
            (price) => price.hash_name === item.market_hash_name
          );
          if (priceData) {
            return {
              ...item,
              price: priceData.price,
              median: priceData.median,
              sold_today: priceData.sold_today,
            };
          }
          return item;
        }),
      };
    });
  }

  public get getFetchedInventories() {
    return this.fetchedInventories;
  }
}

export default ScheduleFetch;
