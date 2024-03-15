import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import passport from "passport";
import { config } from "dotenv";
config();
const router = Router();

// KIEDYŚ TRZEBA TO ZMIENIĆ NA DYNAMICZNE POBIERANIE URL BACKENDU
let GLOBAL_REFER: string = "http://localhost:3000";

router.get("/logout", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  req.logout({}, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ messege: "Error logging out" });
    }
    res.clearCookie("sessionId");
    return res.status(200).json({ message: "Logged out succesfully! " });
  });
});

router.get(
  "/login",
  passport.authenticate("steam", {
    failureRedirect: "/login-error",
  })
);

router.get("/login-v2", (req: Request, res) => {
  if (req.isAuthenticated()) {
    res.redirect(GLOBAL_REFER);
  } else {
    req.headers.referer;
    GLOBAL_REFER = req.headers.referer!;
    res.redirect("/login");
  }
});

router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login-error" }),
  (req: Request, res) => {
    res.cookie("sessionId", req.sessionID);
    console.log("Redirecting to: ", GLOBAL_REFER);
    res.redirect(GLOBAL_REFER);
  }
);

router.get("/protected", ensureAuthenticated, (req, res) => {
  res.json({ message: "You are authenticated" });
});

router.get("/login-error", (_, res) => {
  return res.status(401).json({ message: "Login failed 😭" });
});

export default router;
