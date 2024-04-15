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
} from "./methods";
const Main = () => {
  const { data, isLoading, error, activateFetch } = useFetch({
    url: "http://localhost:3000/items/tf2",
  });

  const itemsDescriptions = data?.descriptions.map((item: Item) => ({
    classid: item.classid,
    market_hash_name: item.market_hash_name,
    icon_url: item.icon_url,
    name_color: item.name_color,
    marketable: item.marketable,
  }));

  const uniqueClassidMap = mapUniqueAssets(data as ItemsResponse);
  const processedData = processFinalAssets(uniqueClassidMap, itemsDescriptions);

  return (
    <div className="flex flex-col">
      <div className="order-1 flex justify-center pt-12 pb-6">
        <Button
          className="px-4 py-3 items-center flex justify-cente"
          onClick={activateFetch}
          disabled={isLoading}
        >
          <div className="flex flex-row gap-2 text-3xl ">
            {isLoading ? (
              <IsLoading className="size-8" />
            ) : (
              <IoMdCodeDownload className="size-8" />
            )}
            <span className="">Fetch Inventory</span>
          </div>
        </Button>
      </div>
      <ContentDetails className="order-3">
        <>
          {error && <h1>Error: {error}</h1>}
          {data && !isLoading && (
            <pre>{JSON.stringify(processedData, null, 2)}</pre>
          )}
        </>
      </ContentDetails>
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
