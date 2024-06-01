import { InvestmentDetails } from "../../../types/investmentFormTypes";

type DetailsViaTextAreaProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaTextArea: React.FC<DetailsViaTextAreaProps> = () => {
  return (
    <div>
      <h1>DetailsViaTextArea</h1>
    </div>
  );
};

export default DetailsViaTextArea;
