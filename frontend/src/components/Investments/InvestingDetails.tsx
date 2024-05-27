import { TbListDetails } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import InputCustom from "../common/Input/InputCustom";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import { useRef, useState } from "react";
import { InvestmentDetails } from "../../types/investmentFormTypes";
type InvestingDetailsProps = {};

const InvestingDetails: React.FC<InvestingDetailsProps> = () => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleAddInvestment = () => {
    if (
      nameRef.current &&
      priceRef.current &&
      priceRef.current.value !== "" &&
      nameRef.current.value !== ""
    ) {
      setInvestmentDetails((prev) => [
        ...prev,
        {
          name: nameRef.current!.value,
          boughtPrice: +parseFloat(priceRef.current!.value).toFixed(2),
        },
      ]);
    }
  };

  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl">
        <TbListDetails size={24} className="self-center" />
        Fill details about investing.
      </h2>
      <div>
        {investmentDetails.map((investment, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 justify-center items-center"
          >
            <p>{investment.name}</p>
            <p>{investment.boughtPrice}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-2 flex-wrap justify-center items-center gap-y-8">
        <InputCustom
          label="Item Name"
          widthClassName="w-1/5  min-w-48"
          required
          ref={nameRef}
        />
        <InputCustom
          label="Buy Order Price"
          type="number"
          widthClassName="w-1/5  min-w-48"
          required
          ref={priceRef}
        />
        <ButtonRipple
          className=" min-w-10 h-10 flex items-center justify-center"
          onClick={handleAddInvestment}
        >
          <Ripple duration={3000} />
          <IoMdAdd className="" />
        </ButtonRipple>
      </div>
    </>
  );
};

export default InvestingDetails;
