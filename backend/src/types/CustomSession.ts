import { Session } from "express-session";

export interface CustomSession extends Session {
  referer?: string;
}
