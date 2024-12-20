type TMarketPrice =
  | {
      success: true;
      lowest_price: string;
      volume: string;
      median_price: string;
    }
  | {
      success: false;
      lowest_price: never;
      volume: never;
      median_price: never;
    };

type TMarketDetails =
  | {
      success: true;
      start: number;
      pagesize: number;
      total_count: number;
      searchdata: {
        query: string;
        search_descriptions: false;
        total_count: number;
        pagesize: 1;
        prefix: "searchResults";
        class_prefix: "market";
      };
      results: [
        {
          name: string;
          hash_name: string;
          sell_listings: number;
          sell_price: number;
          sell_price_text: string;
          app_icon: string;
          app_name: string;
          asset_description: {
            appid: number;
            classid: string;
            instanceid: string;
            background_color: string;
            icon_url: string;
            tradable: number;
            name: string;
            name_color: string;
            type: string;
            market_name: string;
            market_hash_name: string;
            commodity: number;
          };
          sale_price_text: string;
        }
      ];
    }
  | ({
      success: false;
    } & Record<string, never>);

type TResponseMarketPrice = {
  price: string;
  median: string;
  sold_today: string;
  hash_name: string;
};

type TResponseMarketDetails = {
  total_items: number;
};

export type {
  TMarketPrice,
  TMarketDetails,
  TResponseMarketPrice,
  TResponseMarketDetails,
};
