import { IoMdCodeDownload } from "react-icons/io";
import useFetch from "../../hooks/useFetch";
import IsLoading from "../reusable/IsLoading";
import ContentDetails from "./Content";
import ButtonRipple from "../reusable/Button/ButtonRipple";
import Ripple from "../reusable/Button/Ripple";
import {
  Item,
  ItemsResponse,
  mapUniqueAssets,
  processFinalAssets,
} from "./methodsInventory";
import Card from "../reusable/Card";
import { useMemo, useState } from "react";
import ContentWrapper from "../wrapper/ContentWrapper";

const Main = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
  const processedData = useMemo(() => {
    return processFinalAssets(uniqueClassidMap, itemsDescriptions || []);
  }, [uniqueClassidMap, itemsDescriptions]);

  const handleGameChange = (game: string) => {
    setSelectedGame(game);
    activateFetch();
    setHoveredItem(null);
  };

  return (
    <div className="flex flex-col order-2 w-full">
      <div className="order-1">
        <h1 className="text-4xl text-center mt-5">Fetch your inventory</h1>
      </div>
      <div className="flex justify-center pt-12 pb-6 gap-5 order-2 mx-12">
        {games.map((game) => (
          <ButtonRipple
            key={game}
            className={`w-full px-4 py-3 items-center flex justify-center ${
              selectedGame === game ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => handleGameChange(game)}
            disabled={isLoading}
          >
            <Ripple duration={2000} />
            <span className="flex flex-row gap-3">
              {isLoading && selectedGame === game ? (
                <IsLoading className="size-6" />
              ) : (
                <IoMdCodeDownload className="size-6" />
              )}
              {game.toUpperCase()}
            </span>
          </ButtonRipple>
        ))}
      </div>
      {data && (
        <>
          <div className="order-2 flex justify-center flex-col">
            <ContentDetails
              detatails={{
                totalQuantity: data.total_inventory_count,
                game: selectedGame,
                status: error ? `failed ${error.message}` : "successfully",
                selectedItem: hoveredItem,
              }}
            ></ContentDetails>
          </div>
          <ContentWrapper className="flex flex-wrap flex-row gap-5 items-center justify-center m-10 p-10 order-3">
            {processedData.length > 0 &&
              processedData.map((item, index) => (
                <Card
                  key={index}
                  className={` text-white  hover:scale-110 transition-all hover:opacity-80 duration-300 w-24 h-32 w-max-24 h-max-30 flex flex-row 
                `}
                  onMouseEnter={() => setHoveredItem(item.market_hash_name)}
                >
                  <img
                    src={`https://community.cloudflare.steamstatic.com/economy/image/${item.icon_url}`}
                    alt="Unknown Item"
                    className="text-center order-1 size-[94px]"
                  />
                  <span className="flex text-bottom items-end order-2">
                    {item.amount}
                  </span>
                </Card>
              ))}
            {processedData.length === 0 && (
              <p className="text-2xl">No items found 😭</p>
            )}
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

export default Main;
