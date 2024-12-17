import MongoDB from "./modules/mongodb/mongodb";
import { getMongoDBConString, getProxiesURL } from "./config/env";
import ScheduleFetch from "./modules/fetchqueue/schedule-fetch";
import { writeFile } from "fs";
const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  const proxies = getProxiesURL();
  const scheduleFetch = new ScheduleFetch(
    [proxies.PROXY_1_GET, proxies.PROXY_2_GET],
    ["76561198090272581", "76561198141466635"]
  );
  try {
    console.log("Test1");
    await db.connect();
    await scheduleFetch.executeFetchInventories();
    console.log("AFTER FETCH");
    const inventories = scheduleFetch.getInventory;
    writeFile(
      "inventories.json",
      JSON.stringify(inventories, null, 2),
      (err) => {
        if (err) throw err;
        console.log("complete");
      }
    );
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await db.disconnect();
    process.exit(0);
  }
};

main().catch(console.error);
