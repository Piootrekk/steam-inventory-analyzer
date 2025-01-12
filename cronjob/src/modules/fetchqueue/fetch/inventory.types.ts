import { TSupportedGames } from "./games.type";

type TAsset = {
  appid: number;
  contextid: string;
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
};

type TUniqueClassId = {
  classid: string;
  amount: number;
};

type TDescription = {
  classid: string;
  instanceid: string;
  background_color: string;
  icon_url: string;
  tradable: 1 | 0;
  name_color: string;
  type: string;
  market_hash_name: string;
  market_tradable_restriction: 1 | 0 | undefined;
  market_marketable_restriction: 1 | 0 | undefined;
  marketable: 1 | 0;
};

type TDescriptionExtended = TDescription & Record<string, any>;

type TInventory = TDescription & TUniqueClassId;

type TInventoryResponse = {
  assets: TAsset[];
  descriptions: TDescription[];
  total_inventory_count: number;
  success: 1 | 0;
  rwgrsn: number;
};

type TInventoryDTO = {
  steamid: string;
  game: TSupportedGames;
  inventory: TInventory[];
};

export type {
  TAsset,
  TUniqueClassId,
  TDescription,
  TInventoryResponse,
  TInventory,
  TDescriptionExtended,
  TInventoryDTO,
};
