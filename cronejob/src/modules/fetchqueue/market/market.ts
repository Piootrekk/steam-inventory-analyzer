import { TSupportedGames } from "../fetch/games.type";
import { fetchItemPrice } from "../fetch/market.fetch";
import { TMarketPriceDTO } from "../fetch/market.type";
import { TFetchedInventory } from "../inventory/inventory.type";

type TNameWithGame = {
  market_hash_name: string;
  game: TSupportedGames;
};

class Market {
  private namesWithGame: TNameWithGame[];
  private tasks: ((proxy?: string) => Promise<TMarketPriceDTO>)[];

  public constructor(inventories: TFetchedInventory[]) {
    this.namesWithGame = this.getMarketableItems(inventories);
    this.tasks = this.calculateTasks();
  }

  private getMarketableItems(inventories: TFetchedInventory[]) {
    const martketable: TNameWithGame[] = inventories.flatMap((inventory) => {
      return inventory.inventory
        .filter(
          (invDetails) =>
            invDetails.marketable !== 0 ||
            invDetails.market_marketable_restriction !== 0
        )
        .map((invDetails) => ({
          market_hash_name: invDetails.market_hash_name,
          game: inventory.game,
        }));
    });
    const uniqueMarketable = Array.from(
      new Map(
        martketable.map((item) => [
          `${item.market_hash_name}_${item.game}`,
          item,
        ])
      ).values()
    );

    console.log(`DEFINED ${uniqueMarketable.length} ITEMS TO PARSE PRICE`);
    return uniqueMarketable;
  }

  private calculateTasks() {
    return this.namesWithGame.map((nameWithGame) => {
      return (proxy?: string) =>
        fetchItemPrice(nameWithGame.market_hash_name, nameWithGame.game, proxy);
    });
  }

  public get getTasks() {
    return this.tasks;
  }
}

export default Market;
