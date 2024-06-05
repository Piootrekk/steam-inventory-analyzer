import { InvestmentDetails } from "../../../types/investmentFormTypes";
import InputFile from "../../common/InputFile";

type DetailsViaFileInputProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaFileInput: React.FC<DetailsViaFileInputProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <InputFile label="Upload File" fileTypes=".json" />
    </div>
  );
};

export default DetailsViaFileInput;
