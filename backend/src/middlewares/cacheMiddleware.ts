import { Request, Response, NextFunction } from "express";
import * as cache from "memory-cache";

const cacheMiddleware = (min: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = "__express__" + (req.originalUrl || req.url);
    const cachedBody = cache.get(key);

    if (cachedBody) {
      console.log(`Cache hit for ${key}`);
      return res.send(cachedBody);
    } else {
      const originalSend = res.send;
      res.send = (body): Response<any, Record<string, any>> => {
        console.log(`Cache miss for ${key}, saved`);
        cache.put(key, body, min * 60 * 1000);
        return originalSend.call(res, body);
      };
    }
    next();
  };
};

export default cacheMiddleware;
