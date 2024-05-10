import { IoMdCodeDownload } from "react-icons/io";
import useFetchWithTrigger from "../../hooks/useFetchWithTrigger";
import IsLoading from "../common/IsLoading";
import ContentDetails from "./Content";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import Card from "../common/Card";
import { useState } from "react";
import ContentWrapper from "../wrapper/ContentWrapper";
import { baseBackendURL } from "../../env";
import { InventoryReturn } from "../../types/inventoryTypes";

const Main = () => {
  const [selectedGame, setSelectedGame] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const games = ["tf2", "cs2", "rust"];

  const { data, isLoading, error, activateFetch } =
    useFetchWithTrigger<InventoryReturn>({
      url: `${baseBackendURL}/v2/items/${selectedGame}`,
    });

  const handleGameChange = (game: string) => {
    setSelectedGame(game);
    activateFetch();
    setHoveredItem(null);
  };

  return (
    <div className="flex flex-col ">
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
          <ContentWrapper className="order-2 flex justify-center flex-col mx-10 my-4">
            <ContentDetails
              detatails={{
                totalQuantity: data.total_inventory_count,
                game: selectedGame,
                status: error ? `failed ${error.message}` : "successfully",
                selectedItem: hoveredItem,
              }}
            ></ContentDetails>
          </ContentWrapper>
          <ContentWrapper className="flex flex-wrap flex-row gap-5 items-center justify-center mx-10  px-5 py-10 order-3  mb-8">
            {data.items.length > 0 &&
              data.items.map((item, index) => (
                <Card
                  key={index}
                  className={`text-white hover:scale-110 transition-all hover:opacity-80 duration-300 w-24 h-30 flex flex-row`}
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
            {data.items.length === 0 && (
              <p className="text-2xl">No items found 😭</p>
            )}
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

export default Main;
