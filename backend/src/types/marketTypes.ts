export type MarketResponse = {
  success: boolean;
  lowest_price: string;
  volume: string;
  median_price: string;
};

export type MarketResponseFixed = {
  success: boolean;
  lowest_price: number;
  volume: number;
  median_price: number;
};

export type MarketQueryResponse = {
  success: boolean;
  total_count: string;
  results: {
    hash_name: string;
    sell_listings: number;
    sell_price_text: string;
    sell_price: number;
    app_name: string;
    asset_description: {
      appid: number;
      icon_url: string;
    };
  }[];
};

export type MarketQuerySelected = {
  success: boolean;
  hash_name: string;
  sell_listings: number;
  app_name: string;
  appid: number;
  icon_url: string;
  time: string;
};
