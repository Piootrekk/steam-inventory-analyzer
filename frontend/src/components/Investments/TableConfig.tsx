import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { InvestmentDetails } from "../../types/investmentFormTypes";

export const TableBody = (
  setInvestmentDetails: React.Dispatch<
    React.SetStateAction<InvestmentDetails[]>
  >
) => {
  const resetIds = (details: InvestmentDetails[]): InvestmentDetails[] => {
    return details.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  };

  return [
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
};

export const TableFooter = (investmentDetails: InvestmentDetails[]) => {
  const totalInvestment = investmentDetails.reduce(
    (total, item) => total + item.boughtPrice,
    0
  );
  const totalItems = investmentDetails.length;

  return (
    <div className="flex px-5">
      <span className="flex-auto">Total Items: {totalItems}</span>
      <span className="flex-auto">
        Total Investment: {totalInvestment.toFixed(2)} [PLN]
      </span>
    </div>
  );
};
