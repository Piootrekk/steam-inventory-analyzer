// index.ts
import express, { Express, NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import passport from "passport";
import authMiddleware from "./middlewares/steamAuthMiddleware";
import headerMiddleware, {
  corsOptionsMiddleware,
} from "./middlewares/headerMiddleware";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import router from "./routes";
config();
const app: Express = express();

app.use(express.json());
app.use(headerMiddleware);
app.use(corsOptionsMiddleware);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(authMiddleware);
app.use(router);

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (_, res: Response) => {
  res.json({ message: "Test" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
