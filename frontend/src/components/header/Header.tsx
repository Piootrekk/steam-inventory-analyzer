import { FaSteam } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { useAuthContext } from "../../context/AuthContext";
import { baseBackendURL } from "../../env";
import DropDownMenu from "../reusable/DropMenu/DropDownMenu";
import { MouseEventHandler, useState } from "react";
import DropMenuContent from "./DropContentHeader";

const handleLogin = async () => {
  window.location.href = `${baseBackendURL}/login-v2`;
};

export type HeaderProps = {};

const Authorization = () => {
  const { auth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (auth.isLogged) {
    return (
      <>
        <button
          className="flex items-center focus:outline-none"
          onClick={toggleMenu}
        >
          <span>{auth.user.displayName}</span>
          <div className="h-12 w-12 mx-3">
            <img
              src={auth.user._json.avatarfull}
              alt="Steam avatar"
              className="size-full  border border-gray-600"
            />
          </div>
          <SlArrowDown className="w-3 h-3" />
        </button>
        <DropDownMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          elements={[<DropMenuContent />]}
        />
      </>
    );
  } else if (auth.isLogged === false) {
    return (
      <div className="flex items-center focus:outline-none">
        <span className="mx-3">Login with:</span>
        <button className="h-10 w-10" onClick={handleLogin}>
          <FaSteam className="w-full h-full" />
        </button>
      </div>
    );
  }
  return <></>;
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between items-center bg-gray-800 text-white h-20 px-12 border-b-2 border-gray-600">
      <div>
        <h1 className="text-4xl font-semibold">Price Analyzer</h1>
      </div>
      <div>
        <Authorization />
      </div>
    </header>
  );
};

export default Header;
