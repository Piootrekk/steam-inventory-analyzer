// sessionMiddleware.ts
import session from "express-session";
import { randomBytes } from "crypto";

const secretKey = randomBytes(32).toString("hex");
const sessionMiddleware = session({
  secret: secretKey,
  name: "sessionId",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 15, // 15 weeks
    secure: "auto",
  },
});

export default sessionMiddleware;
