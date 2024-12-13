import axios from "axios";
import { TSupportedGames } from "./games.type";
import { TMarketDetails, TMarketPrice } from "./market.type";
const fetchItemPrice = async (
  name: string,
  game: TSupportedGames,
  currency: string = "6",
  language: string = "english"
) => {
  const url = new URL("https://steamcommunity.com/market/priceoverview/");
  const params = new URLSearchParams({
    appid: game,
    currency: currency,
    market_hash_name: name,
    l: language,
  });
  url.search = params.toString();
  const response = await axios.get<TMarketPrice>(url.href);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  return {
    price: response.data.lowest_price,
    median: response.data.median_price,
    sold_today: response.data.volume,
  };
};

const fetchItemWithDetails = async (
  name: string,
  game: TSupportedGames,
  language: string = "english"
) => {
  const url = new URL("https://steamcommunity.com/market/search/render/");
  const params = new URLSearchParams({
    query: name,
    start: "0",
    count: "1",
    norender: "1",
    appid: game,
    l: language,
  });
  url.search = params.toString();
  const response = await axios.get<TMarketDetails>(url.href);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  return {
    total_items: response.data.results[0].sell_listings,
    name: response.data.results[0].name,
  };
};

export { fetchItemPrice };
