// AuthMiddleware.ts
import passportSteam from "passport-steam";
import { Request, NextFunction, Response } from "express";
import passport from "passport";

const configureSteamAuth = (req: Request) => {
  const SteamStrategy = passportSteam.Strategy;

  const backendURL = `${req.protocol}:${req.get("host")}`;
  const frontURL = process.env.FRONTEND_URL || backendURL;
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done: any) => {
    done(null, id);
  });

  passport.use(
    new SteamStrategy(
      {
        returnURL: `${backendURL}/auth/steam/return`,
        realm: backendURL,
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

export default authMiddleware;
