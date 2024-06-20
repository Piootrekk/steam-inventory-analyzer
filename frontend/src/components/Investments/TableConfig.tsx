import { InvestmentDetails } from "../../types/investmentFormTypes";
import { Column } from "../common/Table/CustomTable";
import { camelCaseToWords, parserToFloat } from "../../utils/other";

export const TableBody = () => {
  return [
    {
      header: "No.",
      accessor: (row: InvestmentDetails) => row.id,
      editable: false,
      key: "id",
    },
    {
      header: "Item Name",
      accessor: (row: InvestmentDetails) => row.name,
      editable: true,
      key: "name",
      modifier: (value: string) => camelCaseToWords(value),
    },
    {
      header: "Buy Order Price",
      accessor: (row: InvestmentDetails) => row.boughtPrice,
      editable: true,
      key: "boughtPrice",
      modifier: (value: string) => parserToFloat(value),
    },
  ] as Column<InvestmentDetails>[];
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
