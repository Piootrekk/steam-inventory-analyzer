import { TSupportedGames } from "../fetch/games.type";
import { TInventory } from "../fetch/inventory.types";
import {
  TMarketDetailsDTO,
  TMarketPriceDTO,
} from "../fetch/market.type";

type TInventoryDTO = {
  steamid: string;
  game: TSupportedGames;
  inventory: TInventory[];
} & Partial<TMarketPriceDTO> &
  Partial<TMarketDetailsDTO>;

export type { TInventoryDTO };
