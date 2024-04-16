import { useState } from "react";
import Button from "../reusable/Button";
import { IoMdCodeDownload } from "react-icons/io";
import useFetch from "../../hooks/useFetch";
import IsLoading from "../reusable/IsLoading";
import ContentDetails from "./Content";
import {
  Item,
  ItemsResponse,
  mapUniqueAssets,
  processFinalAssets,
} from "./methodsInventory";

const Main = () => {
  const [selectedGame, setSelectedGame] = useState("");

  const games = ["tf2", "cs2", "rust"];

  const { data, isLoading, error, activateFetch } = useFetch<ItemsResponse>({
    url: `http://localhost:3000/items/${selectedGame}`,
  });

  const itemsDescriptions = data?.descriptions?.map((item: Item) => ({
    classid: item.classid,
    market_hash_name: item.market_hash_name,
    icon_url: item.icon_url,
    name_color: item.name_color,
    marketable: item.marketable,
  }));

  const uniqueClassidMap = mapUniqueAssets(data as ItemsResponse);
  const processedData = processFinalAssets(
    uniqueClassidMap,
    itemsDescriptions || []
  );

  const handleGameChange = (game: string) => {
    setSelectedGame(game);
    activateFetch();
  };

  return (
    <div className="flex flex-col">
      <div className="order-1">
        <h1 className="text-4xl text-center mt-5">Fetch your inventory</h1>
      </div>
      <div className="flex justify-center pt-12 pb-6 gap-5 order-2">
        {games.map((game) => (
          <Button
            key={game}
            className={`w-full px-4 py-3 items-center flex justify-center ${
              selectedGame === game ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => handleGameChange(game)}
            disabled={isLoading}
          >
            <span className="">
              {isLoading && selectedGame === game ? (
                <IsLoading className="size-8" />
              ) : (
                <IoMdCodeDownload className="size-8" />
              )}
              {game.toUpperCase()}
            </span>
          </Button>
        ))}
      </div>
      {data && (
        <ContentDetails
          className="order-3 "
          detatails={{ totalQuantity: data?.total_inventory_count }}
        >
          <>
            {error && <h1>Error: {error}</h1>}
            {!isLoading && (
              <pre className="overflow-x-hidden whitespace-pre-wrap">
                {JSON.stringify(processedData, null, 2)}
              </pre>
            )}
          </>
        </ContentDetails>
      )}
    </div>
  );
};

export default Main;

// <div className="flex flex-wrap flex-row gap-5 items-center px-10 py-10 order-2">
//         {cards.map((card, index) => (
//           <Card
//             key={index}
//             className="w-24 h-24 text-white text-4xl hover:scale-110 transition-all hover:opacity-80 duration-300"
//           >
//             <h1>{card}</h1>
//           </Card>
//         ))}
//       </div>
