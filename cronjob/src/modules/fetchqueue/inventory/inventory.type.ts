import { TSupportedGames } from "../fetch/games.type";
import { TInventory } from "../fetch/inventory.types";
import { TMarketDetailsDTO, TMarketPriceDTO } from "../fetch/market.type";

// type TInventoryDTO = {
//   steamid: string;
//   game: TSupportedGames;
//   inventory: TInventory[];
// };

type TInventoryWithPrices = TInventory &
  Partial<TMarketPriceDTO> &
  Partial<TMarketDetailsDTO>;

type TFetchedInventory = {
  steamid: string;
  game: TSupportedGames;
  inventory: TInventoryWithPrices[];
};

export type { TFetchedInventory, TInventoryWithPrices };
