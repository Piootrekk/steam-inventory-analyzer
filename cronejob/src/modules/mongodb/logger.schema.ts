import { Schema } from "mongoose";

const errorsSchema = new Schema({
  time: { type: String, require: false },
  message: { type: String, require: true },
});

const loggerSchema = new Schema({
  time: { type: Date, default: Date.now },
  catchedErros: { type: [errorsSchema], require: true },
});

export default loggerSchema;
