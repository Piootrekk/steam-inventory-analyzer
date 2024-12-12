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
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  tradable: 1 | 0;
  name_color: string;
  type: string;
  market_name: string;
  market_hash_name: string;
  commodity: number;
  market_tradable_restriction: number;
  market_marketable_restriction: number;
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

export type {
  TAsset,
  TUniqueClassId,
  TDescription,
  TInventoryResponse,
  TInventory,
  TDescriptionExtended,
};
