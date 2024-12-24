import axios from "axios";
import { TSupportedGames } from "./games.type";
import {
  TMarketDetails,
  TMarketPrice,
  TMarketDetailsDTO,
  TMarketPriceDTO,
} from "./market.type";
import convertError from "../../../config/error-converter";

const fetchItemPrice = async (
  name: string,
  game: TSupportedGames,
  proxy?: string
): Promise<TMarketPriceDTO> => {
  const marketEndpoint = new URL(
    "https://steamcommunity.com/market/priceoverview/"
  );

  const params = new URLSearchParams({
    appid: game,
    currency: "6",
    market_hash_name: name,
    l: "english",
  });
  marketEndpoint.search = params.toString();

  const urlToFetch = proxy
    ? `${proxy}${encodeURIComponent(marketEndpoint.href)}`
    : marketEndpoint.href;
  try {
    const response = await axios.get<TMarketPrice>(urlToFetch);
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
  } catch (error) {
    const convertedError = convertError(error);
    console.log(convertedError.message);
    throw new Error(
      `ERROR: ${convertedError.message}, NAME: ${name}, GAME: ${game}`
    );
  }
};

const fetchItemWithDetails = async (
  name: string,
  game: TSupportedGames,
  language: string = "english",
  proxy?: string
): Promise<TMarketDetailsDTO> => {
  const marketEndpoint = new URL(
    "https://steamcommunity.com/market/search/render/"
  );
  const params = new URLSearchParams({
    query: name,
    start: "0",
    count: "1",
    norender: "1",
    appid: game,
    l: language,
  });
  marketEndpoint.search = params.toString();

  const urlToFetch = proxy
    ? `${proxy}${encodeURIComponent(marketEndpoint.href)}`
    : marketEndpoint.href;
  const response = await axios.get<TMarketDetails>(urlToFetch);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  return {
    total_items: response.data.results[0].sell_listings,
  };
};

export { fetchItemPrice, fetchItemWithDetails };
