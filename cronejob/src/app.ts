import MongoDB from "./modules/mongodb/mongodb";
import { getMongoDBConString, getProxiesURL } from "./config/env";
import ScheduleFetch from "./modules/fetchqueue/schedule-fetch";
import * as fs from "node:fs";
const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  const proxies = getProxiesURL();
  const scheduleFetch = new ScheduleFetch(
    [proxies.PROXY_1_GET, proxies.PROXY_2_GET],
    2000
  );
  scheduleFetch.addProfile("76561198141466635", ["730"]);

  try {
    console.log("-------=START=-------");
    await db.connect();

    console.log("BEFORE FETCH");
    await scheduleFetch.fetchAllInventories();
    await scheduleFetch.fetchAllPrices();
    const results = scheduleFetch.getFetchedInventories;
    fs.writeFileSync("inventories.json", JSON.stringify(results, null, 2));
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await db.disconnect();
    console.log("-------=STOP=-------");
    process.exit(0);
  }
};

main().catch(console.error);
