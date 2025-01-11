import { config } from "dotenv";

config();

const getMongoDBConString = () => {
  const { MONGODB_CON_STRING } = process.env;
  if (MONGODB_CON_STRING === undefined) {
    throw new Error("MONGODB_CON_STRING NOT EXIST");
  }

  return MONGODB_CON_STRING;
};

const getProxiesURL = (): string[] => {
  const proxies = process.env.PROXIES?.split(",") || [];
  return proxies;
};

const getProxiesBackupURL = (): string[] => {
  const proxies = process.env.BACKUP_PROXIES?.split(",") || [];
  return proxies;
};

export { getMongoDBConString, getProxiesURL, getProxiesBackupURL };
