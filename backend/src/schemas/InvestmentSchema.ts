import mongoose, { Schema } from "mongoose";

const InvestmentItemSchema = new Schema({
  id: Number,
  name: String,
  boughtPrice: Number,
});

const InvestmentSchema = new Schema({
  steamId: String,
  spreadsheetName: String,
  investment: [InvestmentItemSchema],
});

const Investment = mongoose.model("Investment", InvestmentSchema);

export default Investment;
