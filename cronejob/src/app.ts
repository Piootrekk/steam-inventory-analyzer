import MongoDB from "./modules/mongodb/mongodb";
import { getMongoDBConString, getProxiesURL } from "./config/env";
import ScheduleFetch from "./modules/fetchqueue/schedule-fetch";
import { writeFileSync } from "node:fs";
import logger from "./modules/logger/logger-singleton";
import { UserInvestmentSchema } from "./modules/mongodb/inventory.schema";
const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  const proxies = getProxiesURL();
  const scheduleFetch = new ScheduleFetch(proxies, 3000);
  scheduleFetch.addProfile("76561198141466635", ["730"]);

  // scheduleFetch.addProfile("76561198141466635", ["730", "440", "252490"]);
  // scheduleFetch.addProfile("76561198090272581", ["730", "440", "252490"]);

  try {
    console.log("-------=START=-------");

    await db.connect();
    await db.createInventoryCollection();
    db.addModel("inventory", UserInvestmentSchema);

    console.log("BEFORE FETCH");
    await scheduleFetch.fetchAllInventories();
    await scheduleFetch.fetchAllPrices();
    const results = scheduleFetch.getFetchedInventories;
    writeFileSync("inventories.json", JSON.stringify(results, null, 2));
    writeFileSync("errors.json", JSON.stringify(logger.getErrorLogs, null, 2));
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await db.disconnect();
    console.log("-------=STOP=-------");
    process.exit(0);
  }
};

main().catch(console.error);
