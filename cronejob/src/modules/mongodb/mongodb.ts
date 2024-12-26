import mongoose from "mongoose";
import { TFetchedInventory } from "../fetchqueue/inventory/inventory.type";
import UserInvestmentSchema from "./inventory.schema";
import loggerSchema from "./logger.schema";
import { TErrorLog } from "../logger/logger.type";

class MongoDB {
  private uri: string;
  private db: mongoose.mongo.Db | undefined = mongoose.connection.db;
  constructor(uri: string) {
    this.uri = uri;
  }

  private async isCollectionExists(collection: string): Promise<boolean> {
    if (!this.db) {
      throw new Error("Database is not created, can't verify collections");
    }
    const collections = await this.db.listCollections().toArray();
    return collections.some((collec) => collec.name === collection);
  }

  private determinateConnectedDb() {
    const dbConnections = mongoose.connection.db;
    if (dbConnections === undefined) {
      throw new Error("Database is not created.");
    } else {
      this.db = dbConnections;
      return dbConnections;
    }
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.uri, {
      tlsAllowInvalidCertificates: true,
    });
    if (mongoose.connection.readyState === 1) {
      console.log("Mongo connected succesfully.");
      this.determinateConnectedDb();
    } else throw new Error("Connecting to mongo went wrong.");
  }

  public async createInventoriesCollection(): Promise<void> {
    const isColExist = await this.isCollectionExists("Inventories");
    if (!isColExist && this.db) await this.db.createCollection("Inventories");
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    if (mongoose.connection.readyState === 0) {
      console.log("Disconnected from MongoDB");
      this.db = undefined;
    } else throw new Error("Disconnecting to mongo went wrong.");
  }

  public async createLoggerCollection(): Promise<void> {
    const isColExist = await this.isCollectionExists("Logs");
    if (!isColExist && this.db) await this.db.createCollection("Logs");
  }

  public async addLogs(
    loggingMap: Map<string, number>,
    errorLogs: TErrorLog[]
  ): Promise<void> {
    const LoggerModel = mongoose.model("Logs", loggerSchema);
    await LoggerModel.create({
      catchedErros: errorLogs,
      timers: loggingMap,
    });
  }

  public async addFetchedItems(items: TFetchedInventory[]): Promise<void> {
    const InventoryModel = mongoose.model("Inventories", UserInvestmentSchema);
    await InventoryModel.create({ investments: items });
  }
}

export default MongoDB;
