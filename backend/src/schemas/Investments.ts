import mongoose, { Schema } from "mongoose";

const Investment = new Schema({
  steamId: { type: String, required: true },
  spreadsheetName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  investments: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      boughtPrice: { type: Number, required: true },
      currentPrice: { type: Number, required: true },
      quantity: { type: Number, required: false },
      volume: { type: Number, required: false },
      sell_listings: { type: Number, required: false },
    },
  ],
});

const InvestmentModel = mongoose.model("InvestmentPrices", Investment);

export default InvestmentModel;
