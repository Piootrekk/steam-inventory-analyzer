import { config } from "dotenv";

config();

const { MONGODB_CON_STRING } = process.env;
if (!MONGODB_CON_STRING) {
  throw new Error("MONGODB_CON_STRING NOT EXIST");
}

export { MONGODB_CON_STRING };
