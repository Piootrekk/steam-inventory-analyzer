import { Schema } from "mongoose";

const InventoryItemSchema = new Schema({
  classid: { type: String, required: true },
  amount: { type: Number, required: true },
  instanceid: { type: String, required: true },
  background_color: { type: String, require: false },
  icon_url: { type: String, required: true },
  tradable: { type: Number, required: true },
  name_color: { type: String, required: false },
  type: { type: String, required: false },
  market_hash_name: { type: String, required: true },
  market_tradable_restriction: { type: Number, required: false },
  market_marketable_restriction: { type: Number, required: false },
  marketable: { type: Number, required: true },
  price: { type: String, required: false },
  median: { type: String, required: false },
  sold_today: { type: String, required: false },
});

const InventorySchema = new Schema({
  steamid: { type: String, required: true },
  game: { type: String, required: true },
  inventory: { type: [InventoryItemSchema], required: true },
});

const UserInvestmentSchema = new Schema({
  time: { type: Date, default: Date.now },
  investment: { type: [InventorySchema], require: true },
});

export { UserInvestmentSchema };
