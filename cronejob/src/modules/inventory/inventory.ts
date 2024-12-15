import { TMultiInventories } from "./inventory.type";

class Inventory {
  private inventories: TMultiInventories[] = [];

  public get getInventory() {
    return this.inventories;
  }

  public async fetchInventories(
    proxies: string[],
    ids: string[],
    games: string[],
    interval: number
  ) {
    Promise.all([]);
  }
}
