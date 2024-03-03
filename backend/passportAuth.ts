// passport.ts
import passport from "passport";
import passportSteam from "passport-steam";
import { config } from "dotenv";

config();

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done: any) => {
  done(null, obj);
});

export default passport;
