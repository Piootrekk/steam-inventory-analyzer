import { config } from "dotenv";

config();

const getMongoDBConString = () => {
  const { MONGODB_CON_STRING } = process.env;
  if (MONGODB_CON_STRING === undefined) {
    throw new Error("MONGODB_CON_STRING NOT EXIST");
  }

  return MONGODB_CON_STRING;
};

const getProxiesURL = () => {
  const { PROXY_1_GET, PROXY_2_GET } = process.env;
  return { PROXY_1_GET, PROXY_2_GET };
};

export { getMongoDBConString, getProxiesURL };
