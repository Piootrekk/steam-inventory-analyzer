import ContentWrapper from "../wrapper/ContentWrapper";
import ButtonRipple from "../common/Button/ButtonRipple";
import Ripple from "../common/Button/Ripple";
import { NavLink } from "react-router-dom";

const NotCreated: React.FC = () => {
  return (
    <>
      <ContentWrapper className="m-12 p-12 ">
        <h1 className="text-center text-4xl">
          You haven't created your price analysis spreadsheet yet, <br /> would
          you like to create one?
        </h1>
        <div className="flex justify-center mt-10">
          <NavLink to="/investments/create">
            <ButtonRipple className="w-1/4 px-4 py-3 items-center flex justify-center min-w-48">
              <Ripple duration={2000} />
              Create Spreadsheet
            </ButtonRipple>
          </NavLink>
        </div>
      </ContentWrapper>
    </>
  );
};

export default NotCreated;
