import rateLimit from "express-rate-limit";

export const DEFAULT_RATE_LIMIT = 10;
export const TIMEOUT = 60000;

const rateLimiterMiddleware = (
  limit = DEFAULT_RATE_LIMIT,
  timeout = TIMEOUT
) => {
  return rateLimit({
    windowMs: timeout,
    max: limit,
    message: { error: "Too many requests" },
    handler: (req, res) => {
      res.status(429).json({ error: "Too many requests" });
    },
  });
};

export default rateLimiterMiddleware;
