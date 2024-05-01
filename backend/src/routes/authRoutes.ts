import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import passport from "passport";
import { config } from "dotenv";
import rateLimiterMiddleware from "../middlewares/rateLimiterMiddleware";
config();
const router = Router();

let GLOBAL_REFER = process.env.BACKEND_URL!;

router.get("/logout", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .json({ success: false, message: "You are not logged in" });
  }
  req.logout({}, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, messege: "Error logging out" });
    }
    res.clearCookie("sessionId");
    return res
      .status(200)
      .json({ success: true, message: "Logged out succesfully! " });
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
    GLOBAL_REFER = req.headers.referer
      ? req.headers.referer
      : process.env.BACKEND_URL!;
    console.log("GLOBAL REFER: ", GLOBAL_REFER);
    res.redirect("/login");
  }
});

router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login-error" }),
  (req: Request, res) => {
    res.cookie("sessionId", req.sessionID);

    console.log("Redirecting to: ", GLOBAL_REFER);
    res.redirect(GLOBAL_REFER ? GLOBAL_REFER : process.env.BACKEND_URL!);
  }
);

router.get(
  "/protected",
  ensureAuthenticated,
  rateLimiterMiddleware(5),
  (req, res) => {
    res.json({ message: "You are authenticated" });
  }
);

router.get("/login-error", (req, res) => {
  if (req.headers.referer === process.env.BACKEND_URL || !req.headers.referer) {
    if (req.isAuthenticated()) {
      return res.redirect(process.env.BACKEND_URL!);
    }
    return res.send(`<a href="/login-v2">Login</a>`);
  }
  return res.status(401).json({ message: "Login failed" });
});

router.get("/is-logged", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isLogged: true, user: req.user });
  } else {
    return res.status(200).json({ isLogged: false, user: null });
  }
});

export default router;
