import { useRef } from "react";
import { InvestmentDetails } from "../../../types/investmentFormTypes";
import InputCustom from "../../common/Input/InputCustom";
import { IoMdAdd } from "react-icons/io";
import ButtonRipple from "../../common/Button/ButtonRipple";
import Ripple from "../../common/Button/Ripple";
import {CamelCaseToWords} from "../../../utils/other";

type DetailsViaTextInputProps = {
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >;
  resetIds: (details: InvestmentDetails[]) => InvestmentDetails[];
};

const DetailsViaTextInput: React.FC<DetailsViaTextInputProps> = ({
  setInvestmentDetails,
  resetIds,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleAddInvestment = () => {
    if (
      nameRef.current &&
      priceRef.current &&
      priceRef.current.value !== "" &&
      nameRef.current.value !== ""
    ) {
      setInvestmentDetails((prev) =>
        resetIds([
          ...prev,
          {
            id: prev.length + 1,
            name: CamelCaseToWords(nameRef.current!.value),
            boughtPrice: +parseFloat(priceRef.current!.value).toFixed(2),
          },
        ])
      );
      nameRef.current.value = "";
      priceRef.current.value = "";
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 flex-wrap justify-center items-center gap-y-8 mt-4">
        <InputCustom
          label="Item Name"
          widthClassName="w-1/5 min-w-48"
          required
          ref={nameRef}
        />
        <InputCustom
          label="Buy Order Price"
          type="number"
          min={0}
          step={0.01}
          widthClassName="w-1/5 min-w-48"
          required
          ref={priceRef}
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

export default DetailsViaTextInput;
