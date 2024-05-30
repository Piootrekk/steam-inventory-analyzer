import { InvestmentFormTypes } from "../../types/investmentFormTypes";

type FinishInvestingProps = {
  data: InvestmentFormTypes;
};

const FinishInvesting: React.FC<FinishInvestingProps> = ({ data }) => {
  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl">Summary</h2>
      <h3 className="text-xl">Spreadsheet Name: {data.spreadsheetName}</h3>
      <h3 className="text-xl">Investments:</h3>
      <ul>
        {data.investments.map((investment, index) => (
          <li key={index}>
            <h4 className="text-lg">
              {investment.name} - {investment.boughtPrice} [PLN]
            </h4>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FinishInvesting;
