import Inventory from "../inventory/inventory";

class ScheduleFetch {
  private proxies: string[] | string;
  private steamIds: string[] | string;
  private inventory: Inventory;

  constructor(
    proxies: string[] | string | undefined,
    steamIds: string[] | string
  ) {
    this.proxies = proxies ? proxies : [];
    this.steamIds = steamIds;
    this.inventory = new Inventory(5000, ["730", "440", "252490"]);
  }

  public get getInventory() {
    return this.inventory.getInventory;
  }

  public async executeFetchInventories() {
    await this.inventory.fetchAllInventories(this.proxies, this.steamIds);
  }
}

export default ScheduleFetch;
