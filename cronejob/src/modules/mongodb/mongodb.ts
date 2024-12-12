import mongoose from "mongoose";

class MongoDB {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.uri);
    if (mongoose.connection.readyState === 1) {
      console.log("Mongo connected succesfully.");
    } else throw new Error("Connecting to mongo went wrong.");
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    if (mongoose.connection.readyState === 0) {
      console.log("Disconnected from MongoDB");
    } else throw new Error("Disconnecting to mongo went wrong.");
  }

  public addModel<T>(name: string, schema: mongoose.Schema<T>): void {
    mongoose.model(name, schema);
  }
}

export default MongoDB;
