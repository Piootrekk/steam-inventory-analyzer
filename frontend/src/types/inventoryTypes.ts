export type CombinedItem = {
  key: string;
  market_hash_name: string;
  icon_url: string;
  amount: number;
  name_color: string;
  marketable: number;
};

export type InventoryReturn = {
  items: CombinedItem[];
  total_inventory_count: number;
  success: boolean | number;
};
