import { LuFileSpreadsheet } from "react-icons/lu";
import { InvestmentFormTypes } from "../../types/investmentFormTypes";
import { TbListDetails } from "react-icons/tb";

type FinishInvestingProps = {
  data: InvestmentFormTypes;
};

const FinishInvesting: React.FC<FinishInvestingProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center text-2xl mb-4">SUMMARY:</h2>
      <div className="flex flex-row w-2/3 justify-center items-stretch">
        <div className="w-1/2 flex flex-col gap-2  p-4 border-r border-gray-200">
          <h3 className="flex flex-row text-xl text-center mb-2">
            <LuFileSpreadsheet size={24} className="mr-2" />
            Spreadsheet Name:
          </h3>
          <p className="text-lg">{data.spreadsheetName}</p>
        </div>
        <div className="w-1/2 flex flex-col gap-2 justify-center items-center p-4">
          <h3 className="flex flex-row text-xl justify-center items-center mb-2">
            <TbListDetails size={24} className="mr-2" />
            Investments Details:
          </h3>
          {data.investments.length > 5 && (
            <>
              <p className="text-lg">To many investments to display</p>
              <p className="text-lg">
                Total investments: {data.investments.length}
              </p>
            </>
          )}
          {data.investments.length <= 5 && (
            <ul className="text-lg">
              {data.investments.map((investment, index) => (
                <li key={index}>
                  {investment.name} - {investment.boughtPrice}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinishInvesting;
