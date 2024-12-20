import {
  TAsset,
  TDescriptionExtended,
  TInventory,
  TUniqueClassId,
} from "./inventory.types";

const sumByClassid = (assets: TAsset[]): TUniqueClassId[] => {
  const summedAssets = Object.values(
    assets.reduce<Record<string, TUniqueClassId>>((acc, asset) => {
      const { classid, amount } = asset;
      if (acc[classid]) acc[classid].amount += Number(amount);
      else acc[classid] = { classid, amount: Number(amount) };
      return acc;
    }, {})
  );
  return summedAssets;
};

const margeAssetWithDescriptions = (
  assets: TUniqueClassId[],
  descriptions: TDescriptionExtended[]
): TInventory[] => {
  const marged: TInventory[] = assets.map((asset) => {
    const correspondingItem = descriptions.find(
      (item) => item.classid === asset.classid
    );
    if (!correspondingItem) throw new Error("Smth went wrong");
    correspondingItem.market_marketable_restriction === undefined
      ? (correspondingItem.market_marketable_restriction = 0)
      : correspondingItem.market_marketable_restriction;
    correspondingItem.market_tradable_restriction === undefined
      ? (correspondingItem.market_tradable_restriction = 0)
      : correspondingItem.market_tradable_restriction;
    const {
      appid,
      instanceid,
      classid,
      currency,
      background_color,
      icon_url,
      tradable,
      name_color,
      type,
      market_name,
      market_hash_name,
      commodity,
      market_tradable_restriction,
      market_marketable_restriction,
      marketable,
      name,
    } = correspondingItem;

    return {
      ...asset,
      appid,
      classid,
      instanceid,
      currency,
      background_color,
      icon_url,
      tradable,
      name_color,
      type,
      market_name,
      market_hash_name,
      commodity,
      market_tradable_restriction,
      market_marketable_restriction,
      marketable,
      name,
    };
  });
  return marged;
};

export { sumByClassid, margeAssetWithDescriptions };
