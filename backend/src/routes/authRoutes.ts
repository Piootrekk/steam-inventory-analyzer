import { Router, Request, Response } from "express";
import { ensureAuthenticated } from "../middlewares/steamAuthMiddleware";
import passport from "passport";

const router = Router();

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
  }),

  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.redirect("/already-logged-in");
    }
    res.cookie("sessionId", req.sessionID);
    res.redirect("/");
  }
);

router.get(
  "/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/login-error" }),
  (req, res) => {
    res.cookie("sessionID", req.sessionID);
    console.log(req.sessionID);
    res.redirect(process.env.FRONTEND_URL!);
  }
);

router.get("/protected", ensureAuthenticated, (_, res) => {
  res.json({ message: "You are authenticated" });
});

router.get("/login-error", (_, res) => {
  return res.status(401).json({ message: "Login failed 😭" });
});

router.get("/already-logged-in", (_, res) => {
  res.status(406).json({ message: "You are already logged in" });
});

export default router;