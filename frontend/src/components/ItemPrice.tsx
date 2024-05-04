import ButtonRipple from "./common/Button/ButtonRipple";
import Ripple from "./common/Button/Ripple";
import useFetchWithTrigger from "../hooks/useFetchWithTrigger";
import { baseBackendURL } from "../env";
import { useRef } from "react";
import ContentWrapper from "./wrapper/ContentWrapper";
import IsLoading from "./common/IsLoading";

const ItemPrice = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, activateFetch, isLoading, setData } =
    useFetchWithTrigger<MarketResponse | null>({
      url: `${baseBackendURL}/market/cs2/${inputRef.current?.value}`,
    });

  const handleCheckPrice = () => {
    if (inputRef.current && inputRef.current.value) {
      activateFetch();
      setData(null);
    }
  };

  return (
    <div className="flex flex-col order-2 w-full mt-5">
      <h1 className="text-4xl text-center ">Type item name, check price!</h1>
      <div className="flex flex-row justify-center pt-6 pb-6 gap-5 order-1 mx-48">
        <input
          className="border-2 flex border-gray-600 p-2 text-xl rounded-lg w-full bg-gray-700 h-16
          focus:outline-none focus:border-gray-500"
          type="text"
          ref={inputRef}
        />
        <ButtonRipple
          className="w-48 bg-blue-500 rounded-lg text-2xl"
          onClick={handleCheckPrice}
        >
          <Ripple duration={3000} velocity={1500} />
          Check price
        </ButtonRipple>
      </div>
      <div className="flex flex-col justify-center items-center order-2 mx-10 p-5">
        {isLoading && <IsLoading className="size-12" />}
      </div>
      {data && (
        <ContentWrapper className="flex flex-col justify-center items-center order-2 mx-10 p-5">
          <div className="flex flex-col items-center text-xl">
            <p>Price: {data.lowest_price}</p>
            <p>Volume: {data.volume}</p>
            <p>Median price: {data.median_price}</p>
          </div>
        </ContentWrapper>
      )}
    </div>
  );
};

export default ItemPrice;
