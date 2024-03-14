// AuthMiddleware.ts
import passportSteam from "passport-steam";
import { Request, NextFunction, Response } from "express";
import passport from "passport";
import { config } from "dotenv";

config();

const configureSteamAuth = (req: Request) => {
  const SteamStrategy = passportSteam.Strategy;

  const BACKEND_URL = `${req.protocol}:${req.get("host")}`;
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done: any) => {
    done(null, id);
  });

  passport.use(
    new SteamStrategy(
      {
        returnURL: `${BACKEND_URL}/auth/steam/return`,
        realm: BACKEND_URL,
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
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  configureSteamAuth(req);
  next();
};

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login-error");
};

export default authMiddleware;
