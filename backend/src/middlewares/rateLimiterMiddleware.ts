import { Request, Response, NextFunction } from "express";

export const DEFAULT_RATE_LIMIT = 10;
export const TIMEOUT = 60000;

const rateLimiterMiddleware = (
  limit = DEFAULT_RATE_LIMIT,
  timeout = TIMEOUT
) => {
  let requestCount = 0;
  let lastReset = Date.now();

  return (req: Request, res: Response, next: NextFunction) => {
    if (Date.now() - lastReset > timeout) {
      requestCount = 0;
      lastReset = Date.now();
    }

    if (requestCount < limit) {
      requestCount++;
      next();
    } else {
      res.status(429).json({ error: "Too many requests" });
    }
  };
};

export default rateLimiterMiddleware;
