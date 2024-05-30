import React, { useRef, useState } from "react";
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
  const componentConfigs = [
    {
      component: SpreedsheetCreate,
      ref: spreedsheetCreateRef,
      props: {},
    },
    {
      component: InvestingDetails,
      ref: investingDetailsRef,
      props: {},
    },
    {
      component: FinishInvesting,
      props: { data },
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-y-5">
        <ComponentPagination page={page} components={componentConfigs} />
        <div className="w-full flex flex-row gap-x-5 gap-y-2 justify-center flex-wrap">
          <ButtonRipple
            className="w-1/6 min-w-32"
            onClick={handleClickPrev}
            disabled={page === 0}
          >
            Prev
            <Ripple duration={2000} />
          </ButtonRipple>

          <ButtonRipple
            className="w-1/6 min-w-32"
            onClick={handleNextClick}
            disabled={page === maxPage}
          >
            Next
            <Ripple duration={2000} />
          </ButtonRipple>
        </div>
      </div>
    </>
  );
};

export default FormCreating;
