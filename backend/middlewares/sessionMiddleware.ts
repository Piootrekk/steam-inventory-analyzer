import session from "express-session";
import { randomBytes } from "crypto";

const secretKey = randomBytes(32).toString("hex");
const sessionMiddleware = session({
  secret: secretKey,
  name: "sessionId",
  resave: true,
  saveUninitialized: true,
});

export default sessionMiddleware;
