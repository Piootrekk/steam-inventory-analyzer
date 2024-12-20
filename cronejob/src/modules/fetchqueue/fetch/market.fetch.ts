import axios from "axios";
import { TSupportedGames } from "./games.type";
import {
  TMarketDetails,
  TMarketPrice,
  TResponseMarketDetails,
  TResponseMarketPrice,
} from "./market.type";

const fetchItemPrice = async (
  name: string,
  game: TSupportedGames,
  proxy?: string
): Promise<TResponseMarketPrice> => {
  const marketEndpoint = "https://steamcommunity.com/market/priceoverview/";
  const url = new URL(`${proxy ? proxy + marketEndpoint : marketEndpoint}`);
  const params = new URLSearchParams({
    appid: game,
    currency: "6",
    market_hash_name: name,
    l: "english",
  });
  url.search = params.toString();
  console.log(`URL: ${url.href}`);
  console.log("tut");
  const response = await axios.get<TMarketPrice>(url.href);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  console.log(
    `TIME: ${new Date().toLocaleString()}, ITEM: ${name}, GAME: ${game}, PROXY: ${proxy}`
  );
  return {
    price: response.data.lowest_price,
    median: response.data.median_price,
    sold_today: response.data.volume,
    hash_name: name,
  };
};

const fetchItemWithDetails = async (
  name: string,
  game: TSupportedGames,
  language: string = "english",
  proxy?: string
): Promise<TResponseMarketDetails> => {
  const marketEndpoint = "https://steamcommunity.com/market/search/render/";
  const url = new URL(`${proxy ? proxy + marketEndpoint : marketEndpoint}`);
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
  };
};

export { fetchItemPrice, fetchItemWithDetails };
