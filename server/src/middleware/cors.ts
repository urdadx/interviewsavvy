import type { CorsOptions } from "cors";

const cors: CorsOptions = {
  origin:
    process.env.NODE_ENV == "production"
      ? (process.env.CLIENT_URI_PROD as string)
      : (process.env.CLIENT_URI as string),
  credentials: true,
};

export { cors };
