import ContentWrapper from "../wrapper/ContentWrapper";
import { MarketCombinedType } from "../../types/marketTypes";
import { CgClose } from "react-icons/cg";

type ItemPriceDisplayProps = {
  data: MarketCombinedType[];
  removeItem: (id: string) => void;
};

const ItemPriceDisplay: React.FC<ItemPriceDisplayProps> = ({
  data,
  removeItem,
}) => {
  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {data.map((item) => (
        <div key={item.id}>
          <ContentWrapper className="shadow-md rounded-lg p-4 max-w-[240px] min-w-[240px] relative">
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="absolute top-2 right-2  text-white  hover:opacity-60 focus:outline-none rounded-md"
            >
              <CgClose />
            </button>

            <img
              src={`https://community.cloudflare.steamstatic.com/economy/image/${item.icon_url}`}
              alt={item.hash_name}
              className="w-24 h-24 mx-auto pb-2"
            />
            <h2
              className="text-2xl font-semibold text-center truncate"
              title={item.hash_name}
            >
              {item.hash_name}
            </h2>
            <div className="flex flex-col items-center text-lg truncate">
              <p>Lowest Price: {item.lowest_price} PLN</p>
              <p>Median Price: {item.median_price} PLN</p>
              <p>Sell Listings: {item.sell_listings}</p>
              <p>Volume: {item.volume}</p>
              <p className="text-xs">Time: {item.time}</p>
              <a
                href={`https://steamcommunity.com/market/listings/${item.appid}/${item.hash_name}`}
                target="_blank"
                className="hover:underline text-gray-600 text-xs pt-3"
              >
                {"{STEAM LINK}"}
              </a>
            </div>
          </ContentWrapper>
        </div>
      ))}
    </div>
  );
};

export default ItemPriceDisplay;
