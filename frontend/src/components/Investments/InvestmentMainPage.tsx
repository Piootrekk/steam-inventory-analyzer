import { baseBackendURL } from "../../env";
import useFetch from "../../hooks/useFetch";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import IsLoading from "../common/IsLoading";
import InvestmentsData from "./InvestmentsData";
import NotCreated from "./NotCreated";

type InvestmentMainPage = {};

const InvestmentMainPage: React.FC<InvestmentMainPage> = () => {
  const { data, isLoading, error } = useFetch<InvestmentDetails[]>({
    url: `${baseBackendURL}/investments`,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <IsLoading className="size-36" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">Error fetching data</div>;
  }
  if (data?.length === 0) {
    return <NotCreated />;
  } else {
    return <InvestmentsData data={data!} />;
  }
};

export default InvestmentMainPage;
