import { useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import NavbarContent from "./NavbarContent";

const Navbar = () => {
  const [showIconsOnly, setShowIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setShowIconsOnly((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col min-h-screen text-white order-1 bg-gray-800 py-5 duration-300 ${
        !showIconsOnly ? "w-min-[200px]" : "w-16"
      } `}
    >
      <div
        className="p-4 flex flex-row items-center gap-x-2 font-bold cursor-pointer min-h-[64px]"
        onClick={toggleIconsOnly}
      >
        {!showIconsOnly && (
          <>
            <div className="w-6 h-6">
              <FaArrowRightFromBracket className=" w-6 h-6 animate-right-rotate" />
            </div>
            <h1 className="text-2xl">Dashboard</h1>
          </>
        )}
        {showIconsOnly && (
          <FaArrowRightFromBracket className="w-6 h-6 animate-left-rotate" />
        )}
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col space-y-4">
          <ul>
            <NavbarContent showIconsOnly={showIconsOnly} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
