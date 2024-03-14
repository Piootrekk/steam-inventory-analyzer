import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

export const corsOptionsMiddleware = cors({
  origin: process.env.FRONTEND_URL!,
  credentials: true,
});

export default headerMiddleware;
