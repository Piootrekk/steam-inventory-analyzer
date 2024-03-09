import passportSteam from "passport-steam";
import { Request, NextFunction } from "express";
import passport from "passport";

export const configureSteamAuth = (req: Request) => {
  const SteamStrategy = passportSteam.Strategy;
  const host = `${req.protocol}://${req.get("host")}`;

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done: any) => {
    done(null, id);
  });

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
};

export const steamAuthMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  configureSteamAuth(req);
  next();
};
