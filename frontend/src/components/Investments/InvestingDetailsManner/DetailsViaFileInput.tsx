import { InvestmentDetails } from "../../../types/investmentFormTypes";

type DetailsViaFileInputProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaFileInput: React.FC<DetailsViaFileInputProps> = () => {
  return (
    <div>
      <h1>DetailsViaFileInput</h1>
    </div>
  );
};

export default DetailsViaFileInput;
