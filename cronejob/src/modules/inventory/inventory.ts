import { TSupportedGames } from "../fetchqueue/fetch/games.type";
import { fetchInventory } from "../fetchqueue/fetch/inventory.fech";
import { roundRobinProxy } from "../fetchqueue/proxy/proxy.utlis";
import { TMultiInventories } from "./inventory.type";

class Inventory {
  private inventories: TMultiInventories[] = [];
  private delay: number = 1000;
  private games: TSupportedGames[] | TSupportedGames;

  constructor(delay: number, games: TSupportedGames[] | TSupportedGames) {
    this.delay = delay;
    this.games = games;
  }

  public get getInventory() {
    return this.inventories;
  }

  protected async fetchInventoryDelay(
    steamid64: string,
    game: TSupportedGames,
    proxy?: string
  ) {
    const inventory = await fetchInventory(steamid64, game, proxy);
    return inventory;
  }

  public async fetchAllInventories(
    proxies: string[] | string,
    ids: string | string[]
  ) {
    const arrayProxies = Array.isArray(proxies) ? proxies : [proxies];
    const arrayIds = Array.isArray(ids) ? ids : [ids];
    const arrayGames = Array.isArray(this.games) ? this.games : [this.games];

    let proxyIndex = 0; // Indeks rotacji proxy

    console.log("START FETCHING...");

    // Kolejkowanie żądań
    for (const steamid of arrayIds) {
      for (const game of arrayGames) {
        const { proxy, newIndex } = roundRobinProxy(proxyIndex, arrayProxies);
        proxyIndex = newIndex;

        try {
          // Wywołanie fetch z opóźnieniem
          const inventory = await this.fetchInventoryDelay(
            steamid,
            game,
            proxy
          );
          this.inventories.push({
            steamid,
            game,
            inventory,
          });
          console.log(
            `Inventory fetch - successfull : SteamID=${steamid}, Game=${game}, Proxy=${proxy}`
          );
        } catch (error) {
          console.error(
            `Inventory fetch - error: SteamID=${steamid}, Game=${game}, Proxy=${proxy}, Error=${error}`
          );
        }
        await new Promise((resolve) => setTimeout(resolve, this.delay));
      }
    }

    console.log("All fetches complete");
  }
}

export default Inventory;
