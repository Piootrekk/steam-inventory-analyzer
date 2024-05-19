import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import SpreedsheetCreate from "./SpreedsheetCreate";

type FormCreatingProps = {
  page: number;
  handleClickNext: () => void;
  handleClickPrev: () => void;
};

const FormCreating: React.FC<FormCreatingProps> = ({
  handleClickNext,
  handleClickPrev,
  page,
}) => {
  return (
    <>
      <div className=" flex flex-col   items-center gap-y-8">
        <SpreedsheetCreate />
        <div className="w-full flex flex-row gap-x-5 gap-y-2 justify-center flex-wrap">
          {page > 0 && (
            <ButtonRipple className="w-1/6 min-w-32" onClick={handleClickPrev}>
              Prev
              <Ripple duration={2000} />
            </ButtonRipple>
          )}
          <ButtonRipple className="w-1/6 min-w-32" onClick={handleClickNext}>
            Next
            <Ripple duration={2000} />
          </ButtonRipple>
        </div>
      </div>
    </>
  );
};

export default FormCreating;
