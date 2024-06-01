import { forwardRef, useImperativeHandle, useState } from "react";
import { TbListDetails } from "react-icons/tb";

import { InvestmentDetails } from "../../types/investmentFormTypes";
import CustomTable from "../common/CustomTable";
import { TableBody, TableFooter } from "./TableConfig";

import DetailsViaFileInput from "./InvestingDetailsManner/DetailsViaFileInput";
import DetailsViaTextInput from "./InvestingDetailsManner/DetailsViaTextInput";
import DetailsViaTextArea from "./InvestingDetailsManner/DetailsViaTextArea";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import { CamelCaseToWords } from "../../utils/other";
import ComponentPaginationWithPropsInBulk from "../common/ComponentPagination";

const methods = ["textInput", "fileInput", "textArea"] as const;
type Methods = (typeof methods)[number];

const InvestingDetails = forwardRef((_, ref) => {
  const [investmentDetails, setInvestmentDetails] = useState<
    InvestmentDetails[]
  >([]);
  const [method, setMethod] = useState<Methods | null>(null);
  const [error, setError] = useState<string>("");

  const resetIds = (details: InvestmentDetails[]): InvestmentDetails[] => {
    return details.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
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
      <h2 className="text-xl text-gray-100 mt-4">Select method</h2>
      <div className="flex flex-row gap-2 mt-2 flex-wrap justify-center items-center">
        {methods.map((m) => (
          <ButtonRipple
            key={m}
            className={` px-4 py-3 items-center flex justify-center ${
              method === m ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => setMethod(m)}
          >
            {CamelCaseToWords(m)}
            <Ripple duration={1500} />
          </ButtonRipple>
        ))}
      </div>
      {method !== null && (
        <ComponentPaginationWithPropsInBulk
          page={methods.indexOf(method)}
          components={[
            DetailsViaFileInput,
            DetailsViaTextArea,
            DetailsViaTextInput,
          ]}
          commonProps={{
            setInvestmentDetails,
            resetIds,
          }}
        />
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
});

export default InvestingDetails;
