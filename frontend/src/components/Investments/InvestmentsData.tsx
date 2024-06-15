import { ResponseInvestmentTemplate } from "../../types/mongoResponseTypes";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import ContentWrapper from "../wrapper/ContentWrapper";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import { useState } from "react";
import CustomTable from "../common/CustomTable";
import { TableBody, TableFooter } from "./TableConfig";
import { LuFileSpreadsheet } from "react-icons/lu";

type InvestmentsDataProps = {
  data: ResponseInvestmentTemplate[] | null;
};

const InvestmentsData: React.FC<InvestmentsDataProps> = ({ data }) => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);
  const handleInvestmentClick = (investment: InvestmentDetails[]) => {
    setInvestmentDetails(investment);
    console.log(investment);
  };

  return (
    <ContentWrapper className="m-12 p-12">
      <div className="flex flex-row justify-center ">
        <ul>
          {data?.map((el) => (
            <li key={el._id}>
              <ButtonRipple
                className=" min-w-32 px-4 py-3 items-center flex  m-2  p-2"
                onClick={() => handleInvestmentClick(el.investment)}
              >
                <span className="flex flex-row justify-start gap-2">
                  <LuFileSpreadsheet className="size-7 flex  text-clip" />
                  {el.spreadsheetName}
                </span>
                <Ripple duration={1500} />
              </ButtonRipple>
            </li>
          ))}
        </ul>

        <div className="flex flex-col  w-full ">
          {investmentDetails.length > 0 && (
            <>
              <h2 className="flex justify-center text-2xl text-gray-100">
                Investment details:
              </h2>
              <CustomTable
                data={investmentDetails}
                columns={TableBody(setInvestmentDetails)}
                footer={TableFooter(investmentDetails)}
              />
            </>
          )}
        </div>
      </div>
    </ContentWrapper>
  );
};

export default InvestmentsData;
