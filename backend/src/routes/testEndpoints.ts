import { Router } from "express";
import { AuthenticatedUser } from "../types/AuthenticatedUser";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import { fetchAxiosResponse } from "../utils/fetchResponse";

const router = Router();

// Działa 50/50 - bez hash_name
router.get("/440/GetPlayerItems", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/IEconItems_440/GetPlayerItems/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

// Nie działa
router.get("/440/GetSchema", ensureAuthenticated, async (req, res) => {
  const api =
    `https://api.steampowered.com/IEconItems_440/GetSchema/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      language: "en",
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

// XD
router.get("/440/GetSchemaURL", ensureAuthenticated, async (req, res) => {
  const api =
    `https://api.steampowered.com/IEconItems_440/GetSchemaURL/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

// Działa
router.get("/440/GetSchemaOverview", ensureAuthenticated, async (req, res) => {
  const api =
    `https://api.steampowered.com/IEconItems_440/GetSchemaOverview/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

// oficjalny response: "GONE"
router.get("/730/GetPlayerItems", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/IEconItems_730/GetPlayerItems/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

// do sprawdzenia version

router.get("/UpToDateCheck/cs2", ensureAuthenticated, async (req, res) => {
  const api =
    `https://api.steampowered.com/ISteamApps/UpToDateCheck/v1/?` +
    new URLSearchParams({
      appid: "730",
      version: "4021226",
    });
  const response = await fetchAxiosResponse(api);
  res.json(response);
});

export default router;
