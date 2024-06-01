import { Request, Response, NextFunction } from "express";
import * as cache from "memory-cache";
import { v4 as uuidv4 } from "uuid";
import { getDateWithTime } from "../utils/date";

const cacheMiddleware = (min: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = "__express__" + (req.originalUrl || req.url);
    const cachedBody = cache.get(key);

    if (cachedBody) {
      const parsedBody = JSON.parse(cachedBody);
      console.log("Cache hit");
      if (parsedBody.id) {
        parsedBody.id = uuidv4();
        parsedBody.time = getDateWithTime();
      }

      return res.send(parsedBody);
    } else {
      const originalSend = res.send;
      res.send = (body): Response<any, Record<string, any>> => {
        if (res.statusCode >= 400) {
          console.log("Cache miss due to error status code");
          return originalSend.call(res, body);
        }
        console.log("Cache miss, saving to cache");
        cache.put(key, body, min * 60 * 1000);
        return originalSend.call(res, body);
      };
    }
    next();
  };
};

export default cacheMiddleware;
