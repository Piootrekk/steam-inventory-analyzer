import { Schema, Types } from "mongoose";
import { TErrorLog } from "../logger/logger.type";

const errorsSchema = new Schema<TErrorLog>({
  time: { type: String, require: false },
  message: { type: String, require: true },
});

const loggerTimeSchema = new Schema({
  data: {
    type: Map,
    of: Schema.Types.Number,
    required: true,
    default: {},
  },
});

const loggerSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
  time: { type: Date, default: Date.now },
  catchedErros: { type: [errorsSchema], require: true },
  timers: { type: loggerTimeSchema, require: false },
});

export default loggerSchema;
