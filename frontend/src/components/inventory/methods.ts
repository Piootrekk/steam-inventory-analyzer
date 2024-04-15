export type Assets = { classid: string; amount: string };
export type Item = {
  classid: string;
  market_hash_name: string;
  icon_url: string;
  name_color: string;
  marketable: number;
};

export type ItemsResponse = {
  assets?: Assets[];
  descriptions?: Item[];
  total_inventory_count: number;
  success: boolean | number;
  rwgrsn: number;
};

export const mapUniqueAssets = (data: {
  assets?: Assets[];
}): Map<string, number> => {
  const uniqueclassidMap = new Map<string, number>();

  data?.assets?.forEach((item: Assets) => {
    const { classid, amount } = item;
    const parsedAmount = parseInt(amount, 10);
    if (uniqueclassidMap.has(classid)) {
      const currentAmount = uniqueclassidMap.get(classid) || 0;
      uniqueclassidMap.set(classid, currentAmount + parsedAmount);
    } else {
      uniqueclassidMap.set(classid, parsedAmount);
    }
  });

  return uniqueclassidMap;
};

export const processFinalAssets = (
  uniqueClassidMap: Map<string, number>,
  itemsDescriptions: Item[]
) => {
  return Array.from(uniqueClassidMap).map(([classid, amount], _) => {
    const correspondingItem = itemsDescriptions.find(
      (item: Item) => item.classid === classid
    );
    const market_hash_name = correspondingItem?.market_hash_name || "Unknown";
    const icon_url = correspondingItem?.icon_url || "";
    const name_color = correspondingItem?.name_color || "f5f5f5";
    const marketable = correspondingItem?.marketable || 0;

    return {
      key: classid,
      market_hash_name: market_hash_name,
      icon_url: icon_url,
      amount: amount,
      name_color: name_color,
      marketable: marketable,
    };
  });
};
