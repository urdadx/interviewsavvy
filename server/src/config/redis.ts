import Redis from "ioredis";
import { logger } from "./logger";

const redis = new Redis(process.env.REDIS_URL as string);

redis.on("error", (error) => {
  logger.error(`Redis error: ${error}`);
});

redis.on("ready", () => {
  logger.info("Redis is ready");
});

export { redis };
