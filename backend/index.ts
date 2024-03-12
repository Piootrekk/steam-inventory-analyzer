// index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import passport from "passport";

import { AuthenticatedUser } from "./types/AuthenticatedUser";
import { fetchAxiosResponse } from "./utils/fetchResponse";
import authMiddleware from "./middlewares/steamAuthMiddleware";
import headerMiddleware from "./middlewares/headerMiddleware";
import sessionMiddleware from "./middlewares/sessionMiddleware";

config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(headerMiddleware);
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware);

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login-error");
};

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/logout", (req: Request, res: Response) => {
  req.logout({}, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

app.get(
  "/login",
  passport.authenticate("steam", {
    failureRedirect: "/login-error",
  }),
  (_, res: Response) => {
    res.redirect("/");
  }
);

app.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login-error" }),
  (_, res) => {
    res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
  }
);

app.get("/protected", ensureAuthenticated, (_, res) => {
  res.json({ message: "You are authenticated" });
});

app.get("/login-error", (_, res) => {
  return res.status(401).json({ message: "Login failed" });
});

app.get("/already-logged-in", (_, res) => {
  res.status(406).json({ message: "You are already logged in" });
});

app.get("/account", ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

app.get("/account-details", ensureAuthenticated, async (req, res) => {
  const user = req.user as AuthenticatedUser;
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env?.STEAM_API_KEY}&steamids=${user._json.steamid}`;
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

app.get("/games", ensureAuthenticated, async (req, res) => {
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

app.get("/level", ensureAuthenticated, async (req, res) => {
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

app.get("/friends", ensureAuthenticated, async (req, res) => {
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

app.get("/items/:game", ensureAuthenticated, async (req, res) => {
  const allowedGames = ["rust", "cs2", "tf2"];
  const requestedGame = req.params.game.toLowerCase();
  if (!allowedGames.includes(requestedGame)) {
    return res.status(404).json({ message: "Private profile" });
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
  console.log(url);
  const response = await fetchAxiosResponse(url);
  res.json(response);
});

app.get("/test", (_, res: Response) => {
  res.json({ message: "Test" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
