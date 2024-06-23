import { ResponseInvestmentTemplate } from "../../types/mongoResponseTypes";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import ContentWrapper from "../wrapper/ContentWrapper";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import { useState } from "react";
import CustomTable from "../common/Table/CustomTable";
import { TableBody, TableFooter } from "./TableConfig";
import { NavLink } from "react-router-dom";
import InvestmentsSpreadsheets from "./InvestmentsSpreedsheets";

type InvestmentsDataProps = {
  data: ResponseInvestmentTemplate[];
};

const InvestmentsData: React.FC<InvestmentsDataProps> = ({ data }) => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);

  return (
    <>
      <ContentWrapper className="m-12 p-12 ">
        <h1 className="text-center text-4xl"> Create new spreadsheet</h1>
        <div className="flex justify-center mt-10">
          <NavLink to="/investments/create">
            <ButtonRipple className="w-1/4 px-4 py-3 items-center flex justify-center min-w-48">
              <Ripple duration={2000} />
              Create Spreadsheet
            </ButtonRipple>
          </NavLink>
        </div>
      </ContentWrapper>
      <ContentWrapper className="m-12 p-12">
        <InvestmentsSpreadsheets
          data={data}
          setInvestmentDetails={setInvestmentDetails}
        />
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full">
            {investmentDetails.length > 0 && (
              <>
                <h2 className="flex justify-center text-2xl text-gray-100">
                  Investment details:
                </h2>
                <CustomTable
                  data={investmentDetails}
                  setData={setInvestmentDetails}
                  columns={TableBody()}
                  footer={TableFooter(investmentDetails)}
                />
              </>
            )}
          </div>
        </div>
      </ContentWrapper>
    </>
  );
};

export default InvestmentsData;
