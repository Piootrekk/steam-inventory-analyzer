import { IoMdAdd } from "react-icons/io";
import { InvestmentDetails } from "../../../types/investmentFormTypes";
import ButtonRipple from "../../common/Button/ButtonRipple";
import Ripple from "../../common/Button/Ripple";
import TextArea from "../../common/TextArea/TextArea";
import { useRef, useState } from "react";
import { parserToObject } from "../../../utils/parser";

type DetailsViaTextAreaProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaTextArea: React.FC<DetailsViaTextAreaProps> = ({
  setInvestmentDetails,
  resetIds,
}) => {
  const [error, setError] = useState<string>("");
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const handleAddInvestment = () => {
    if (areaRef.current && areaRef.current.value !== "") {
      try {
        const details = parserToObject<InvestmentDetails[]>(
          areaRef.current.value
        );

        setInvestmentDetails((prev) =>
          resetIds([
            ...prev,
            ...details.map((item, index) => ({ ...item, id: index + 1 })),
          ])
        );
        areaRef.current.value = "";
        setError("");
      } catch (error) {
        setError("Invalid JSON format");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <TextArea
          label="Details"
          placeholder="Enter details here..."
          ref={areaRef}
          error={error}
        />
      </div>
      <ButtonRipple
        onClick={handleAddInvestment}
        className="flex p-2 bg-green-700"
      >
        Add
        <Ripple duration={2000} />
        <IoMdAdd className="self-center" />
      </ButtonRipple>
    </>
  );
};

export default DetailsViaTextArea;
