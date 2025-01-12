import axios from "axios";
import { TInventoryDTO, TInventoryResponse } from "./inventory.types";
import { margeAssetWithDescriptions, sumByClassid } from "./inventory.utils";
import { TSupportedGames } from "./games.type";

const fetchInventory = async (
  steamid64: string,
  game: TSupportedGames,
  proxy?: string
): Promise<TInventoryDTO> => {
  const inventoryEndpoint = new URL(
    `https://steamcommunity.com/inventory/${steamid64}/${game}/2`
  );
  const params = new URLSearchParams({
    l: "english",
    count: "5000",
  });
  inventoryEndpoint.search = params.toString();

  const urlToFetch = proxy
    ? `${proxy}${encodeURIComponent(inventoryEndpoint.href)}`
    : inventoryEndpoint.href;

  const response = await axios.get<TInventoryResponse>(urlToFetch);
  if (!response.data) throw new Error("Fetch inventory went wrong");
  if (!response.data.success) throw new Error("Fetching success - false");
  const summariesItems = sumByClassid(response.data.assets);
  const totalItems = margeAssetWithDescriptions(
    summariesItems,
    response.data.descriptions
  );
  console.log(
    `SUCCESS INV FETCH - TIME: ${new Date().toLocaleString()}, GAME: ${game}`
  );
  return {
    steamid: steamid64,
    game: game,
    inventory: totalItems,
  };
};

export { fetchInventory };
