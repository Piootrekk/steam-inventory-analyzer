import { Router } from "express";
import {
  FetchResponse,
  fetchAxiosResponse,
  fetchAxiosResponsePost,
} from "../utils/fetchResponse";
import { gamesMapper } from "../utils/gamesMapper";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import {
  MarketQueryResponse,
  MarketQuerySelected,
  MarketResponse,
  MarketResponseFixed,
} from "../types/marketTypes";
import rateLimiterMiddleware from "../middlewares/rateLimiterMiddleware";
import fetchAxiosResponseProxy from "../utils/proxy";
import { removeThousandthSparator, priceParser } from "../utils/parser";
import { getDateWithTime } from "../utils/date";
import cacheMiddleware from "../middlewares/cacheMiddleware";
import { v4 as uuidv4 } from "uuid";

const router = Router();

const fetchMarketItem = async (gameId: number, hash_name: string) => {
  const url = `https://steamcommunity.com/market/priceoverview/?appid=${gameId}&currency=6&market_hash_name=${hash_name}`;
  const response = await fetchAxiosResponse<MarketResponse>(url);
  if (!response.data) {
    response.error = { statusCode: 404, message: "No data found" };
    return response;
  }
  if (!response.data.success) {
    response.error = { statusCode: 404, message: "Success false" };
    return response;
  }

  const formattedResponse: MarketResponseFixed = {
    success: response.data.success,
    lowest_price: priceParser(response.data.lowest_price),
    volume: removeThousandthSparator(response.data.volume),
    median_price: priceParser(response.data.median_price),
  };
  const resp: FetchResponse<MarketResponseFixed> = {
    data: formattedResponse,
  };

  return resp;
};

const fetchMarketQuery = async (
  query: string
): Promise<Partial<FetchResponse<MarketQuerySelected>>> => {
  const resp: FetchResponse<MarketQuerySelected> = {
    error: undefined,
    data: undefined,
  };
  const url = `https://steamcommunity.com/market/search/render/?query=${query}&search_descriptions=1&start=0&count=10&norender=1`;
  const response = await fetchAxiosResponseProxy<MarketQueryResponse>(url);
  if (!response.data) {
    resp.error = { statusCode: 404, message: "No data found" };
    return resp;
  }
  const data = response.data;
  if (!data.success || !data.results.length || !data.results[0].hash_name) {
    resp.error = { statusCode: 404, message: "Success false" };
    return resp;
  }
  const selectedItems: MarketQuerySelected = {
    success: data.success,
    hash_name: data.results[0].hash_name,
    sell_listings: data.results[0].sell_listings,
    app_name: data.results[0].app_name,
    appid: data.results[0].asset_description.appid,
    icon_url: data.results[0].asset_description.icon_url,
  };
  resp.data = selectedItems;
  return resp;
};

router.get(
  "/market/:game/:hash_name",
  cacheMiddleware(10),
  rateLimiterMiddleware(),
  async (req, res) => {
    const hash_name = req.params.hash_name;
    const requestedGame = req.params.game.toLowerCase();
    const gameId = gamesMapper(requestedGame);
    if (!gameId) {
      return res.status(404).json({ message: "Something wrong" });
    }
    const response = await fetchMarketItem(gameId, hash_name);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response.data);
  }
);

router.get(
  "/search/:query",
  rateLimiterMiddleware(),
  cacheMiddleware(10),
  async (req, res) => {
    const query = req.params.query;
    const response = await fetchMarketQuery(query);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response.data);
  }
);

router.get(
  "/search/:count/:query",
  rateLimiterMiddleware(),
  cacheMiddleware(10),
  async (req, res) => {
    const query = req.params.query;
    const count = req.params.count;
    const url = `https://steamcommunity.com/market/search/render/?query=${query}&search_descriptions=1&start=0&count=${count}&norender=1`;
    const response = await fetchAxiosResponseProxy<MarketQueryResponse>(url);
    if (response.data) {
      return res.json(response.data);
    }
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.status(404).json({ message: "Smth went wrong" });
  }
);

router.get(
  "/combined/:query",
  rateLimiterMiddleware(5),
  cacheMiddleware(10),
  async (req, res) => {
    const query = req.params.query;
    const response = await fetchMarketQuery(query);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    if (!response.data) {
      return res.status(404).json({ message: "No data found" });
    }
    const selectedItems = response.data;

    const response_listed = await fetchMarketItem(
      selectedItems.appid,
      selectedItems.hash_name
    );
    if (response_listed.error) {
      return res
        .status(response_listed.error.statusCode)
        .json(response_listed.error);
    }
    const time = getDateWithTime();
    const id = uuidv4();
    res.json({ ...selectedItems, ...response_listed.data, time, id });
  }
);

// Wymagane steamLoginSecure ;_;
router.get("/myhistory/", ensureAuthenticated, async (req, res) => {
  const { start } = req.query || 0;
  const { count } = req.query || 50;
  const url = `https://steamcommunity.com/market/myhistory/?start=${start}&count=${count}`;
  const response = await fetchAxiosResponsePost(url, {
    sessionid: req.body.sessionId,
  });
  if (response.error) {
    return res.status(response.error.statusCode).json(response.error);
  }
  res.json(response);
});

// <-- kiedyś do ogarnięcia
// https://steamcommunity.com/market/pricehistory/?country=DE&currency=3&appid=440&market_hash_name=Specialized%20Killstreak%20Brass%20Beast

export default router;
