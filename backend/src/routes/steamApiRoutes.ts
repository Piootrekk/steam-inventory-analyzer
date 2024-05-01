import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import { fetchAxiosResponse } from "../utils/fetchResponse";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { Item, ItemsResponse, InventoryReturn } from "../types/InventoryTypes";
import { mapUniqueAssets, processFinalAssets } from "../utils/InventoryUtils";
import { gamesMapper } from "../utils/gamesMapper";
import rateLimiterMiddleware from "../middlewares/rateLimiterMiddleware";

const router = Router();

router.get("/account", ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get(
  "/account-details",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const user = req.user as AuthenticatedUser;
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env?.STEAM_API_KEY}&steamids=${user._json.steamid}`;
    const response = await fetchAxiosResponse(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

router.get(
  "/games",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
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
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

router.get(
  "/level",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const user = req.user as AuthenticatedUser;
    const api =
      `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?` +
      new URLSearchParams({
        key: process.env.STEAM_API_KEY!,
        steamid: user?._json.steamid,
      });
    const response = await fetchAxiosResponse(api);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

router.get(
  "/friends",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const user = req.user as AuthenticatedUser;
    const api =
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?` +
      new URLSearchParams({
        key: process.env.STEAM_API_KEY!,
        steamid: user?._json.steamid,
        relationship: "friend",
      });
    const response = await fetchAxiosResponse(api);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

router.get(
  "/items/:game",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const requestedGame = req.params.game.toLowerCase();
    const gameId = gamesMapper(requestedGame);
    if (!gameId) {
      return res.status(404).json({ message: "Something wrong" });
    }
    const user = req.user as AuthenticatedUser;
    const url =
      `https://steamcommunity.com/inventory/${user?._json.steamid}/${gameId}/2?` +
      new URLSearchParams({
        l: "english",
        count: "5000",
      });
    const response = await fetchAxiosResponse(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

router.get(
  "/v2/items/:game",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const requestedGame = req.params.game.toLowerCase();
    const gameId = gamesMapper(requestedGame);
    if (!gameId) {
      return res.status(404).json({ message: "Something wrong" });
    }
    const user = req.user as AuthenticatedUser;
    const url =
      `https://steamcommunity.com/inventory/${user?._json.steamid}/${gameId}/2?` +
      new URLSearchParams({
        l: "english",
        count: "5000",
      });
    const response = await fetchAxiosResponse(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    const data = response.data as ItemsResponse;
    const itemsDescriptions = data?.descriptions?.map((item: Item) => ({
      classid: item.classid,
      market_hash_name: item.market_hash_name,
      icon_url: item.icon_url,
      name_color: item.name_color,
      marketable: item.marketable,
    }));
    const uniqueClassidMap = mapUniqueAssets(data as ItemsResponse);
    const combinedItems = processFinalAssets(
      uniqueClassidMap,
      itemsDescriptions || []
    );
    const finalItems: InventoryReturn = {
      items: combinedItems,
      total_inventory_count: data.total_inventory_count,
      success: data.success,
    };

    res.json(finalItems);
  }
);

// https://steamcommunity.com/profiles/76561199648107937/inventory/json/730/2
// NIE DZIAŁA BEZ INWAZYJNEGO steamLoginSecure
router.get(
  "/v3/items/:game",
  ensureAuthenticated,
  rateLimiterMiddleware(),
  async (req, res) => {
    const requestedGame = req.params.game.toLowerCase();
    const gameId = gamesMapper(requestedGame);
    if (!gameId) {
      return res.status(404).json({ message: "Something wrong" });
    }
    const user = req.user as AuthenticatedUser;
    const url = `https://steamcommunity.com/profiles/${user?._json.steamid}/inventory/json/${gameId}/2`;
    const response = await fetchAxiosResponse(url);
    if (response.error) {
      return res.status(response.error.statusCode).json(response.error);
    }
    res.json(response);
  }
);

export default router;
