import MongoDB from "./modules/mongodb/mongodb";
import { getMongoDBConString } from "./config/env";
import { fetchInventory } from "./modules/fetch/inventory.fech";

const MONGODB_CON_STRING = getMongoDBConString();

const main = async () => {
  const db = new MongoDB(MONGODB_CON_STRING);
  try {
    console.log("Test1");
    await db.connect();
  } catch (error) {
    console.log(`ERROR: `, error);
  } finally {
    await fetchInventory("76561198090272581", "730");
    await db.disconnect();
    process.exit(0);
  }
};

main().catch(console.error);
