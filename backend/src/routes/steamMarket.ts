import { Router } from "express";
import {
  fetchAxiosResponse,
  fetchAxiosResponsePost,
} from "../utils/fetchResponse";
import { gamesMapper } from "../utils/gamesMapper";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import { MarketQueryResponse } from "../types/marketTypes";
import rateLimiterMiddleware from "../middlewares/rateLimiterMiddleware";
import fetchAxiosResponseProxy from "../utils/proxy";

const router = Router();

router.get(
  "/market/:game/:hash_name",
  rateLimiterMiddleware(),
  async (req, res) => {
    const hash_name = req.params.hash_name;
    const requestedGame = req.params.game.toLowerCase();
    const gameId = gamesMapper(requestedGame);
    if (!gameId) {
      return res.status(404).json({ message: "Something wrong" });
    }
    const url = `http://steamcommunity.com/market/priceoverview/?appid=${gameId}&currency=6&market_hash_name=${hash_name}`;
    const response = await fetchAxiosResponseProxy(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response.data);
  }
);

router.get("/search/:query", rateLimiterMiddleware(), async (req, res) => {
  const query = req.params.query;
  const url = `http://steamcommunity.com/market/search/render/?query=${query}&currency=6&start=0&count=1&norender=1`;
  const response = await fetchAxiosResponse(url);
  if (response.error) {
    return res.status(response.error.statusCode).json(response.error);
  }
  res.json(response.data);
});

router.get(
  "/search/:count/:query",
  rateLimiterMiddleware(),
  async (req, res) => {
    const query = req.params.query;
    const count = req.params.count;
    const url = `http://steamcommunity.com/market/search/render/?query=${query}&start=0&count=${count}&norender=1`;
    const response = await fetchAxiosResponseProxy(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response.data);
  }
);

router.get("/combined/:query", rateLimiterMiddleware(5), async (req, res) => {
  const query = req.params.query;
  const url = `http://steamcommunity.com/market/search/render/?query=${query}&start=0&count=10&norender=1`;
  const response = await fetchAxiosResponseProxy<MarketQueryResponse>(url);
  if (response.error) {
    return res.status(response.error.statusCode).json(response.error);
  }
  const data = response.data;
  if (!data || !data.results || data.results.length === 0) {
    return res.status(404).json({ message: "No results found" });
  }
  const url_listed = `http://steamcommunity.com/market/priceoverview/?appid=${data.results[0].asset_description.appid}&currency=6&market_hash_name=${data.results[0].hash_name}`;
  const response_listed = await fetchAxiosResponse<any>(url_listed);
  if (response_listed.error) {
    return res
      .status(response_listed.error.statusCode)
      .json(response_listed.error);
  }
  res.json({ ...data, ...response_listed.data });
});

// Wymagane steamLoginSecure ;_;
router.get("/myhistory/", ensureAuthenticated, async (req, res) => {
  const { start } = req.query || 0;
  const { count } = req.query || 50;
  const url = `http://steamcommunity.com/market/myhistory/?start=${start}&count=${count}`;
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
