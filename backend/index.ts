// index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import session from "express-session";
import { config } from "dotenv";
import passport from "passport";
import { randomBytes } from "crypto";
import passportSteam from "passport-steam";

config();
const port = process.env.PORT || 3000;
const app: Express = express();
const secretKey = randomBytes(32).toString("hex");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done: any) => {
  done(null, id);
});

const SteamStrategy = passportSteam.Strategy;
passport.use(
  new SteamStrategy(
    {
      returnURL: `http://localhost:${process.env.PORT}/auth/steam/return`,
      realm: `http://localhost:${process.env.PORT}/`,
      apiKey: process.env.STEAM_API_KEY as string,
    },
    (identifier, profile, done) => {
      process.nextTick(() => {
        profile.id = identifier;
        return done(null, profile);
      });
    }
  )
);

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
  "/auth/steam",
  (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return res.redirect("/already-logged-in");
    }
    next();
  },
  passport.authenticate("steam", {
    failureRedirect: "/",
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
  res.send(
    "Ta strona jest chroniona. Tylko zalogowani użytkownicy mogą ją zobaczyć."
  );
});

app.get("/login-error", (_, res) => {
  res.send("Error logging in.");
});

app.get("/already-logged-in", (_, res) => {
  res.send("You are already logged in.");
});

app.get("/account", ensureAuthenticated, function (req, res) {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
