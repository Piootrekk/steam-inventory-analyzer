import { IoMdAdd } from "react-icons/io";
import { InvestmentDetails } from "../../../types/investmentFormTypes";
import InputFile from "../../common/InputFile";
import { parserToObject } from "../../../utils/parser";
import { useRef, useState } from "react";
import ButtonRipple from "../../common/Button/ButtonRipple";
import Ripple from "../../common/Button/Ripple";

type DetailsViaFileInputProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaFileInput: React.FC<DetailsViaFileInputProps> = ({
  setInvestmentDetails,
  resetIds,
}) => {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddInvestment = () => {
    if (
      inputRef.current &&
      inputRef.current.files &&
      inputRef.current.files[0]
    ) {
      const file = inputRef.current.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const details = parserToObject<
            InvestmentDetails[] | InvestmentDetails
          >(event.target!.result as string);

          if (!Array.isArray(details)) {
            setInvestmentDetails((prev) =>
              resetIds([...prev, { ...details, id: prev.length + 1 }])
            );
            return;
          } else {
            setInvestmentDetails((prev) =>
              resetIds([
                ...prev,
                ...details.map((item, index) => ({ ...item, id: index + 1 })),
              ])
            );

            setError("");
          }
        } catch (error) {
          setError("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <InputFile label="Upload File" fileTypes=".json" ref={inputRef} />
        {error && <div className="text-red-500">{error}</div>}
      </div>
      <ButtonRipple
        onClick={handleAddInvestment}
        className={`flex p-2 bg-green-700 `}
      >
        Add
        <Ripple duration={2000} />
        <IoMdAdd className="self-center" />
      </ButtonRipple>
    </>
  );
};

export default DetailsViaFileInput;
