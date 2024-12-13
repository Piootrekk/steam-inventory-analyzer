import {
  TAsset,
  TDescription,
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
      (item) => (item.classid = asset.classid)
    );
    if (!correspondingItem) throw new Error("Smth went wrong");

    const {
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
    };
  });
  return marged;
};

export { sumByClassid, margeAssetWithDescriptions };
