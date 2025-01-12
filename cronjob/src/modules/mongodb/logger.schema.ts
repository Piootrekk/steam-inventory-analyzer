import { Schema, Types, Document } from "mongoose";
import { TErrorLog } from "../logger/logger.type";

type TSchemaError = TErrorLog & Document;

const errorsSchema = new Schema<TSchemaError>({
  time: { type: String, require: false },
  message: { type: String, require: true },
});

const loggerTimeSchema = new Schema({
  data: {
    type: Map,
    of: Schema.Types.Number,
    required: true,
  },
});

const loggerSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  time: { type: Date, default: Date.now },
  catchedErros: { type: [errorsSchema], required: true },
  timers: { type: loggerTimeSchema, required: false },
});

export default loggerSchema;
