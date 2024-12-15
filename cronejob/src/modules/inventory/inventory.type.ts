import { TSupportedGames } from "../fetchqueue/fetch/games.type";
import { TInventory } from "../fetchqueue/fetch/inventory.types";

type TMultiInventories = {
  steamid: string;
  game: TSupportedGames;
  inventory: TInventory[];
};

export type { TMultiInventories };
