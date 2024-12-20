import { TSupportedGames } from "../fetch/games.type";
import { TInventory } from "../fetch/inventory.types";
import {
  TResponseMarketDetails,
  TResponseMarketPrice,
} from "../fetch/market.type";

type TResponseInventory = {
  steamid: string;
  game: TSupportedGames;
  inventory: TInventory[];
} & Partial<TResponseMarketPrice> &
  Partial<TResponseMarketDetails>;

export type { TResponseInventory };
