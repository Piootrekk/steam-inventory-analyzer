import { Router } from "express";
import {
  fetchAxiosResponse,
  fetchAxiosResponsePost,
} from "../utils/fetchResponse";
import { gamesMapper } from "../utils/gamesMapper";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";

const router = Router();

router.get("/market/:game/:hash_name", async (req, res) => {
  const hash_name = req.params.hash_name;
  const requestedGame = req.params.game.toLowerCase();
  const gameId = gamesMapper(requestedGame);
  if (!gameId) {
    return res.status(404).json({ message: "Something wrong" });
  }
  const url = `http://steamcommunity.com/market/priceoverview/?appid=${gameId}&currency=6&market_hash_name=${hash_name}`;
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

router.get("/search/:query", async (req, res) => {
  const query = req.params.query;
  const url = `http://steamcommunity.com/market/search/render/?query=${query}&start=0&count=1&norender=1`;
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

router.get("/search/:count/:query", async (req, res) => {
  const query = req.params.query;
  const count = req.params.count;
  const url = `http://steamcommunity.com/market/search/render/?query=${query}&start=0&count=${count}&norender=1`;
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

// Wymagane steamLoginSecure ;_;
router.get("/myhistory/", ensureAuthenticated, async (req, res) => {
  const { start } = req.query || 0;
  const { count } = req.query || 50;
  const url = `http://steamcommunity.com/market/myhistory/?start=${start}&count=${count}`;
  const response = await fetchAxiosResponsePost(url, {
    sessionid: req.body.sessionId,
  });
  console.log(response);
  res.json(response);
});

// <-- kiedyś do ogarnięcia
// https://steamcommunity.com/market/pricehistory/?country=DE&currency=3&appid=440&market_hash_name=Specialized%20Killstreak%20Brass%20Beast

export default router;
