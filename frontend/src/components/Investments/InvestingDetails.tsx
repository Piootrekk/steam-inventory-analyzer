import React from "react";
import { TbListDetails } from "react-icons/tb";
import InputCustom from "../common/Input/InputCustom";
import { IoMdAdd } from "react-icons/io";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import { useRef, useState } from "react";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import CustomTable from "../common/CustomTable";
import { FaRegTrashAlt } from "react-icons/fa";

type InvestingDetailsProps = {};

const InvestingDetails: React.FC<InvestingDetailsProps> = () => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const resetIds = (details: InvestmentDetails[]): InvestmentDetails[] => {
    return details.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  };

  const tableColumns = [
    {
      header: "No.",
      accessor: (row: InvestmentDetails) => row.id,
    },
    {
      header: "Item Name",
      accessor: (row: InvestmentDetails) => row.name,
    },
    {
      header: "Buy Order Price",
      accessor: (row: InvestmentDetails) => row.boughtPrice,
    },
    {
      header: "Remove",
      accessor: (row: InvestmentDetails) => (
        <button
          className="text-red-500"
          onClick={() =>
            setInvestmentDetails((prev) =>
              resetIds(prev.filter((item) => item.id !== row.id))
            )
          }
        >
          <FaRegTrashAlt size={24} className="self-center" />
        </button>
      ),
    },
  ];

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

  const totalInvestment = investmentDetails.reduce(
    (total, item) => total + item.boughtPrice,
    0
  );
  const totalItems = investmentDetails.length;

  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl text-gray-100">
        <TbListDetails size={24} className="self-center" />
        Fill details about investing.
      </h2>
      <CustomTable
        data={investmentDetails}
        columns={tableColumns}
        footer={
          <div className="flex px-5">
            <span className="flex-auto">Total Items: {totalItems}</span>
            <span className="flex-auto">
              Total Investment: {totalInvestment}
            </span>
          </div>
        }
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
    </>
  );
};

export default InvestingDetails;
