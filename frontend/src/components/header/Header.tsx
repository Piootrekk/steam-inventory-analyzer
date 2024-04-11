import { FaSteam } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { useAuthContext } from "../../context/AuthContext";
import { baseBackendURL } from "../../env";
import DropDownMenu from "../reusable/DropDownMenu";
import { useState } from "react";
import DropMenuContent from "../reusable/DropMenuContent";
import { MenuItems } from "./MenuItems";

const handleLogin = async () => {
  window.location.href = `${baseBackendURL}/login-v2`;
};

export type HeaderProps = {};

const Authorization = () => {
  const { auth } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
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
              className="h-full w-full rounded-full border border-gray-300"
            />
          </div>
          <SlArrowDown className="w-3 h-3" />
        </button>
        <DropDownMenu
          isOpen={isOpen}
          elements={[<DropMenuContent content={MenuItems} />]}
        />
      </>
    );
  } else if (auth.isLogged === false) {
    return (
      <>
        <span className="mx-3">Login with:</span>
        <button className="h-10 w-10" onClick={handleLogin}>
          <FaSteam className="w-full h-full" />
        </button>
      </>
    );
  }
  return <></>;
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 lg:h-16">
        <div className="flex flex-wrap justify-between items-center mx-auto  max-w-screen-xl ">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white ">
            Price Analyzer
          </span>
          <div className="flex items-center lg:order-2">
            <Authorization />
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li
                className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
              >
                Home
              </li>
              <li
                className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
              >
                Inventory
              </li>
              <li
                className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
              >
                Items history
              </li>
              <li
                className="block py-2 pr-4 pl-3 text-white rounded
                bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0
                dark:text-white"
              >
                Investments
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
