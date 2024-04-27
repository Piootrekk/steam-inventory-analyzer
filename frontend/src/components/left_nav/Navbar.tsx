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
      className={`flex flex-col min-h-screen text-white order-1 bg-gray-800 py-5 
       `}
    >
      <div
        className="p-4 flex flex-row items-center gap-x-2 font-bold"
        onClick={toggleIconsOnly}
      >
        {!showIconsOnly && (
          <>
            <FaArrowRightFromBracket size={20} className="rotate-180" />
            <h1 className="text-2xl ">Dashboard</h1>
          </>
        )}
        {showIconsOnly && <FaArrowRightFromBracket size={20} />}
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
