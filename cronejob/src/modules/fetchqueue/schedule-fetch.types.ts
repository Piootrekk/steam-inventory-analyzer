import { TSupportedGames } from "./fetch/games.type";

type TInventoryById = {
  steamId: string;
  game: TSupportedGames[];
};

export type { TInventoryById };
