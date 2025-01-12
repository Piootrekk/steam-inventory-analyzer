import MongoDB from "./modules/mongodb/mongodb";
import {
  getMongoDBConString,
  getProxiesBackupURL,
  getProxiesURL,
} from "./config/env";
import ScheduleFetch from "./modules/fetchqueue/schedule-fetch";
import logger from "./modules/logger/logger-singleton";
const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  const proxies = getProxiesURL();
  const backupProxies = getProxiesBackupURL();
  const scheduleFetch = new ScheduleFetch(proxies, backupProxies, 3000);

  scheduleFetch.addProfile("76561198141466635", ["730", "440", "252490"]);
  scheduleFetch.addProfile("76561198090272581", ["730", "440", "252490"]);

  try {
    console.log("-------=START=-------");
    await db.connect();
    const fetchedToday = await db.isLastActionToday();
    if (fetchedToday) {
      console.log("Skipping, already fetched today...");
      process.exit(0);
    }

    console.log("BEFORE FETCH");
    logger.startTimer("FetchingTime");
    await scheduleFetch.fetchAllInventories();
    await scheduleFetch.fetchAllPrices();
    const inventories = scheduleFetch.getFetchedInventories;
    logger.stopTimer("FetchingTime");
    logger.startTimer("InsertToDb");
    await db.addFetchedItems(inventories);
    logger.stopTimer("InsertToDb");
    const timers = logger.getElapsedTimes;
    const erros = logger.getErrorLogs;
    await db.addLogs(timers, erros);
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await db.disconnect();
    console.log("-------=STOP=-------");
    process.exit(0);
  }
};

main().catch(console.error);
