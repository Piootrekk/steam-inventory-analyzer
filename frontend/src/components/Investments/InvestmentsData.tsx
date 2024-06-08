import { InvestmentDetails } from "../../types/investmentFormTypes";
import ContentWrapper from "../wrapper/ContentWrapper";

type InvestmentsDataProps = {
  data: InvestmentDetails[];
};

const InvestmentsData: React.FC<InvestmentsDataProps> = ({ data }) => {
  return (
    <ContentWrapper className="m-12 p-12 ">
      <div className="flex justify-center">
        <div className="text-2xl">Investments Data</div>
      </div>
      <div className="flex justify-center">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </ContentWrapper>
  );
};

export default InvestmentsData;
