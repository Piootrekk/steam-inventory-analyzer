import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TbListDetails } from "react-icons/tb";
import InputCustom from "../common/Input/InputCustom";
import { IoMdAdd } from "react-icons/io";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import CustomTable from "../common/CustomTable";
import { TableBody, TableFooter } from "./TableConfig";

const InvestingDetails = forwardRef((_, ref) => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const resetIds = (details: InvestmentDetails[]): InvestmentDetails[] => {
    return details.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  };

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
            name: nameRef.current!.value,
            boughtPrice: +parseFloat(priceRef.current!.value).toFixed(2),
          },
        ])
      );
      nameRef.current.value = "";
      priceRef.current.value = "";
    }
  };

  useImperativeHandle(ref, () => ({
    validate: () => {
      if (investmentDetails.length === 0) {
        setError("You must add at least one investment.");
        return false;
      }
      return true;
    },
    getValue: () => investmentDetails,
    setValue: (value: InvestmentDetails[]) => {
      setInvestmentDetails(value);
    },
  }));

  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl text-gray-100">
        <TbListDetails size={24} className="self-center" />
        Fill details about investing.
      </h2>
      <CustomTable
        data={investmentDetails}
        columns={TableBody(setInvestmentDetails)}
        footer={TableFooter(investmentDetails)}
      />
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
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
});

export default InvestingDetails;
