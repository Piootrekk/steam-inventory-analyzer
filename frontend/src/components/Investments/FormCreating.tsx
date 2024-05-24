import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import SpreedsheetCreate from "./SpreedsheetCreate";
import InvestingDetails from "./InvestingDetails";
import FinishInvesting from "./FinishInvesting";
import { componentChanger } from "../../utils/componentChanger";

type FormCreatingProps = {
  page: number;
  handleClickNext: () => void;
  handleClickPrev: () => void;
  maxPage: number;
};

const pagesList = [
  <SpreedsheetCreate />,
  <InvestingDetails />,
  <FinishInvesting />,
];

const FormCreating: React.FC<FormCreatingProps> = ({
  handleClickNext,
  handleClickPrev,
  page,
  maxPage,
}) => {
  return (
    <>
      <div className=" flex flex-col items-center gap-y-8">
        {componentChanger(page, pagesList)}
        <div className="w-full flex flex-row gap-x-5 gap-y-2 justify-center flex-wrap">
          {page > 0 && (
            <ButtonRipple className="w-1/6 min-w-32" onClick={handleClickPrev}>
              Prev
              <Ripple duration={2000} />
            </ButtonRipple>
          )}
          {page < maxPage && (
            <ButtonRipple className="w-1/6 min-w-32" onClick={handleClickNext}>
              Next
              <Ripple duration={2000} />
            </ButtonRipple>
          )}
        </div>
      </div>
    </>
  );
};

export default FormCreating;
