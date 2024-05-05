import ContentWrapper from "./wrapper/ContentWrapper";
import { MarketCombinedType } from "../types/marketTypes";

type ItemPriceDisplayProps = {
  data: MarketCombinedType[];
};

const ItemPriceDisplay: React.FC<ItemPriceDisplayProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((item, index) => (
        <ContentWrapper key={index} className="shadow-md rounded-lg p-4">
          <img
            src={`https://community.cloudflare.steamstatic.com/economy/image/${item.icon_url}`}
            alt={item.hash_name}
            className="w-24 h-24 mx-auto pb-2"
          />
          <h2 className="text-2xl font-semibold text-center">
            {item.hash_name}
          </h2>
          <div className="flex flex-col items-center text-lg">
            <p>Lowest Price: {item.lowest_price} PLN</p>
            <p>Median Price: {item.median_price} PLN</p>
            <p>Sell Listings: {item.sell_listings}</p>
            <p>Volume: {item.volume}</p>
            <a
              href={`https://steamcommunity.com/market/listings/${item.appid}/${item.hash_name}`}
              target="_blank"
              className="hover:underline text-gray-600 text-xs pt-3"
            >
              {"{STEAM LINK}"}
            </a>
          </div>
        </ContentWrapper>
      ))}
    </div>
  );
};

export default ItemPriceDisplay;