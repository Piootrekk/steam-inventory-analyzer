import axios from "axios";
import { TInventoryResponse } from "./inventory.types";
import { margeAssetWithDescriptions, sumByClassid } from "./inventory.utils";
import { TSupportedGames } from "./games.type";

const fetchInventory = async (steamid64: string, game: TSupportedGames) => {
  const url = new URL(
    `https://steamcommunity.com/inventory/${steamid64}/${game}/2`
  );
  const params = new URLSearchParams({
    l: "english",
    count: "5000",
  });
  url.search = params.toString();
  const response = await axios.get<TInventoryResponse>(url.href);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  const summariesItems = sumByClassid(response.data.assets);
  const totalItems = margeAssetWithDescriptions(
    summariesItems,
    response.data.descriptions
  );
  console.log(totalItems);
};

export { fetchInventory };
