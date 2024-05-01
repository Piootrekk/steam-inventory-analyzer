export type MarketResponse = {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
};

export type MarketQueryResponse = {
  success: boolean;
  total_count: string;
  results: {
    hash_name: string;
    sell_listings: number;
    sell_price_text: string;
    sell_price: number;
    asset_description: {
      appid: number;
      icon_url: string;
    };
  }[];
};
