import ButtonRipple from "./common/Button/ButtonRipple";
import Ripple from "./common/Button/Ripple";
import useFetchWithTrigger from "../hooks/useFetchWithTrigger";
import { baseBackendURL } from "../env";
import { useRef, useState, useMemo } from "react";
import IsLoading from "./common/IsLoading";
import { MarketCombinedType } from "../types/marketTypes";
import ItemPriceDisplay from "./ItemPriceDisplay";

const ItemPrice = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [marketData, setMarketData] = useState<MarketCombinedType[]>([]);

  const { data, activateFetch, isLoading } =
    useFetchWithTrigger<MarketCombinedType | null>({
      url: `${baseBackendURL}/combined/${inputRef.current?.value}`,
    });

  useMemo(() => {
    if (data) {
      setMarketData((prevMarketData) => [data, ...prevMarketData]);
    } else {
      setMarketData([]);
    }
  }, [data]);

  const handleCheckPrice = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current && inputRef.current.value) {
      activateFetch();
    }
  };

  const removeItem = (id: string) => {
    setMarketData((prevMarketData) =>
      prevMarketData.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="flex flex-col order-2 mt-5">
      <h1 className="text-4xl text-center ">Type item name, check price!</h1>

      <form
        className="flex flex-row justify-center pt-6 pb-6 gap-5 order-1 mx-48"
        onSubmit={handleCheckPrice}
      >
        <input
          className="border-2 flex border-gray-600 p-2 text-xl rounded-lg w-full bg-gray-700 h-16
          focus:outline-none focus:border-gray-500"
          type="text"
          ref={inputRef}
        />
        <ButtonRipple
          className="w-48 bg-blue-500 rounded-lg text-2xl"
          disabled={isLoading}
          type="submit"
          onClick={handleCheckPrice}
        >
          <Ripple duration={3000} velocity={1500} />

          <span className="flex flex-row gap-3 items-center justify-center">
            {!isLoading ? "Check Price" : <IsLoading className="size-6" />}
          </span>
        </ButtonRipple>
      </form>

      <div className="flex flex-col justify-center items-center order-2 mx-10 p-5">
        {marketData.length > 0 && (
          <ItemPriceDisplay data={marketData} removeItem={removeItem} />
        )}
      </div>
    </div>
  );
};

export default ItemPrice;
