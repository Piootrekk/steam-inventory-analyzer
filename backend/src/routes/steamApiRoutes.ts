import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import { fetchAxiosResponse } from "../utils/fetchResponse";
import { AuthenticatedUser } from "../types/AuthenticatedUser";

const router = Router();

router.get("/account", ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/account-details", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env?.STEAM_API_KEY}&steamids=${user._json.steamid}`;
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

router.get("/games", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const url =
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
      include_appinfo: "1",
      include_played_free_games: "1",
      language: "en",
      include_extended_appinfo: "0",
    });
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

router.get("/level", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

router.get("/friends", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
      relationship: "friend",
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

router.get("/items/:game", ensureAuthenticated, async (req, res) => {
  const allowedGames = ["rust", "cs2", "tf2"];
  const requestedGame = req.params.game.toLowerCase();
  if (!allowedGames.includes(requestedGame)) {
    return res.status(404).json({ message: "Something wrong" });
  }
  const GameIdMap = new Map([
    ["rust", 252490],
    ["cs2", 730],
    ["tf2", 440],
  ]);

  const gameId = GameIdMap.get(requestedGame);
  const user = req.user as AuthenticatedUser;
  const url =
    `https://steamcommunity.com/inventory/${user?._json.steamid}/${gameId}/2?` +
    new URLSearchParams({
      l: "english",
      count: "5000",
    });
  const response = await fetchAxiosResponse(url);
  if (response.error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.json(response);
});

export default router;
