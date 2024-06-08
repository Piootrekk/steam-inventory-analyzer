import React, { useRef, useState, useEffect } from "react";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import SpreedsheetCreate from "./SpreedsheetCreate";
import InvestingDetails from "./InvestingDetails";
import FinishInvesting from "./FinishInvesting";
import { ComponentPagination } from "../common/ComponentPagination";
import { FormRefTypes } from "../../types/formRefTypes";
import {
  InvestmentDetails,
  InvestmentFormTypes,
} from "../../types/investmentFormTypes";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import { baseBackendURL } from "../../env";

type FormCreatingProps = {
  page: number;
  handleClickNext: () => void;
  handleClickPrev: () => void;
  maxPage: number;
};

const FormCreating: React.FC<FormCreatingProps> = ({
  handleClickNext,
  handleClickPrev,
  page,
  maxPage,
}) => {
  const spreedsheetCreateRef = useRef<FormRefTypes<string>>(null);
  const investingDetailsRef = useRef<FormRefTypes<InvestmentDetails[]>>(null);

  const [data, setData] = useState<InvestmentFormTypes>({
    spreadsheetName: "",
    investments: [],
  });

  const sendInvestmentData = async () => {
    const response = await fetch(`${baseBackendURL}/add-investment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  useEffect(() => {
    if (page === 0 && spreedsheetCreateRef.current) {
      spreedsheetCreateRef.current.setValue(data.spreadsheetName);
    }
    if (page === 1 && investingDetailsRef.current) {
      investingDetailsRef.current.setValue(data.investments);
    }
  }, [page, data]);

  const handleNextClick = () => {
    if (page === 0 && spreedsheetCreateRef.current) {
      const isValid = spreedsheetCreateRef.current.validate();
      if (!isValid) {
        return;
      } else {
        const value = spreedsheetCreateRef.current.getValue();
        setData((prev) => ({ ...prev, spreadsheetName: value }));
      }
    }
    if (page === 1 && investingDetailsRef.current) {
      const isValid = investingDetailsRef.current.validate();
      if (!isValid) {
        return;
      } else {
        const value = investingDetailsRef.current.getValue();
        setData((prev) => ({ ...prev, investments: value }));
      }
    }
    handleClickNext();
  };

  const handlePrevClick = () => {
    handleClickPrev();
  };

  const componentConfigs = [
    {
      component: SpreedsheetCreate,
      ref: spreedsheetCreateRef,
    },
    {
      component: InvestingDetails,
      ref: investingDetailsRef,
    },
    {
      component: FinishInvesting,
      props: { data },
    },
  ];

  return (
    <div className="flex flex-col items-center gap-y-5">
      <ComponentPagination page={page} components={componentConfigs} />
      <div className="w-full flex flex-row gap-x-5 gap-y-2 justify-center flex-wrap">
        <ButtonRipple
          className="w-1/6 min-w-32 items-center flex justify-center"
          onClick={handlePrevClick}
          disabled={page === 0}
        >
          <MdNavigateBefore size={24} />
          Prev
          <Ripple duration={2000} />
        </ButtonRipple>

        {page !== maxPage && (
          <ButtonRipple
            className="w-1/6 min-w-32 items-center flex justify-center"
            onClick={handleNextClick}
            disabled={page === maxPage}
          >
            Next
            <MdNavigateNext size={24} />
            <Ripple duration={2000} />
          </ButtonRipple>
        )}
        {page === maxPage && (
          <ButtonRipple
            className="w-1/6 min-w-32 bg-green-600 items-center flex justify-center gap-x-1"
            onClick={sendInvestmentData}
          >
            <TfiSave />
            Save
            <Ripple duration={2000} />
          </ButtonRipple>
        )}
      </div>
    </div>
  );
};

export default FormCreating;
