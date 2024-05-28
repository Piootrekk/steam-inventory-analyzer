import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import SpreedsheetCreate from "./SpreedsheetCreate";
import InvestingDetails from "./InvestingDetails";
import FinishInvesting from "./FinishInvesting";
import ComponentPagination from "../common/ComponentPagination";

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
  return (
    <>
      <div className=" flex flex-col items-center gap-y-5">
        <ComponentPagination
          page={page}
          components={[SpreedsheetCreate, InvestingDetails, FinishInvesting]}
        />
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
            onClick={handleClickNext}
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
