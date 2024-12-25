import MongoDB from "./modules/mongodb/mongodb";
import { getMongoDBConString, getProxiesURL } from "./config/env";
import ScheduleFetch from "./modules/fetchqueue/schedule-fetch";
const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  const proxies = getProxiesURL();
  const scheduleFetch = new ScheduleFetch(proxies, 3000);

  scheduleFetch.addProfile("76561198141466635", ["730", "440", "252490"]);
  scheduleFetch.addProfile("76561198090272581", ["730", "440", "252490"]);
  
  try {
    console.log("-------=START=-------");
    await db.connect();
    await db.createInventoriesCollection();

    console.log("BEFORE FETCH");
    await scheduleFetch.fetchAllInventories();
    await scheduleFetch.fetchAllPrices();
    const inventories = scheduleFetch.getFetchedInventories;
    await db.addFetchedItems(inventories);
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await db.disconnect();
    console.log("-------=STOP=-------");
    process.exit(0);
  }
};

main().catch(console.error);
