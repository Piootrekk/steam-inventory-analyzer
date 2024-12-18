import Inventory from "../inventory/inventory";
import { TFetchedInventory } from "../inventory/inventory.type";
import { TSupportedGames } from "./fetch/games.type";
import ProxyManager from "./proxy/praxy-manager";

class ScheduleFetch {
  private proxies: string[] | string;
  private inventories: Inventory[] = [];
  private proxyManager: ProxyManager;

  constructor(proxies: string[] | string | undefined) {
    this.proxies = Array.isArray(proxies) ? proxies : proxies ? [proxies] : [];
    this.proxyManager = new ProxyManager(this.proxies, 5000);
  }

  public addProfile(steamId: string, games: TSupportedGames[]) {
    const inventory = new Inventory(games, steamId);
    this.inventories.push(inventory);
  }

  public async fetchAllInventories() {
    const tasks: ((proxy?: string) => Promise<TFetchedInventory>)[] = [];
    this.inventories.forEach((inventory) => {
      tasks.push(...inventory.getTasks);
    });
    const allInventories = await this.proxyManager.executeRequestsInBatches(
      tasks
    );
    return allInventories;
  }
}

export default ScheduleFetch;
