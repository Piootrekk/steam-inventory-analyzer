import axios from "axios";
import { TInventoryResponse } from "./inventory.types";
import { margeAssetWithDescriptions, sumByClassid } from "./inventory.utils";

type TSupportedGames = "730" | "440" | "252490";

const fetchInventory = async (steamid64: string, gameId: TSupportedGames) => {
  const url = new URL(
    `https://steamcommunity.com/inventory/${steamid64}/${gameId}/2`
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
