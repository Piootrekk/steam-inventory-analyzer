// index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import session from "express-session";
import { config } from "dotenv";
import passport from "passport";
import { randomBytes } from "crypto";
import passportSteam from "passport-steam";
import { AuthenticatedUser } from "./Types/AuthenticatedUser";

config();
const app: Express = express();
const secretKey = randomBytes(32).toString("hex");
const port = process.env.PORT || 3000;
const SteamStrategy = passportSteam.Strategy;

app.use(express.json());
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  session({
    secret: secretKey,
    name: "sessionId",
    resave: true,
    saveUninitialized: true,
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done: any) => {
  done(null, id);
});

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/logout", (req: Request, res: Response) => {
  req.logout({}, (err) => {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    res.redirect("/");
  });
});

app.get(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return res.redirect("/already-logged-in");
    }
    const host = `${req.protocol}://${req.get("host")}`;
    passport.use(
      new SteamStrategy(
        {
          returnURL: `${host}/auth/steam/return`,
          realm: host,
          apiKey: process.env.STEAM_API_KEY!,
        },
        (identifier, profile, done) => {
          process.nextTick(() => {
            profile.id = identifier;
            return done(null, profile);
          });
        }
      )
    );
    next();
  },

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
    res.redirect("/");
  }
);

app.get("/protected", ensureAuthenticated, (_, res) => {
  res.send("You are authenticated. You can now access the protected route.");
});

app.get("/login-error", (_, res) => {
  res.send("Error logging in.");
});

app.get("/already-logged-in", (_, res) => {
  res.send("You are already logged in.");
});

app.get("/account", ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

app.get("/account-details", ensureAuthenticated, (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env?.STEAM_API_KEY}&steamids=${user._json.steamid}`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching account details.");
    });
});

app.get("/games", ensureAuthenticated, (req, res) => {
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

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err.message);
    });
});
app.get("/friends", ensureAuthenticated, (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
      relationship: "friend",
    });

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching friends.");
    });
});

app.get("/level", ensureAuthenticated, (req, res) => {
  const user = req.user as AuthenticatedUser;
  const api =
    `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?` +
    new URLSearchParams({
      key: process.env.STEAM_API_KEY!,
      steamid: user?._json.steamid,
    });

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send("Error fetching level.");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
