import { FaHome, FaHistory } from "react-icons/fa";
import { BsFillBackpack2Fill, BsGraphUpArrow } from "react-icons/bs";
import { MdOutlinePriceCheck } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Ripple from "../common/Button/Ripple";

type NavbarContentProps = {
  showIconsOnly: boolean;
};

const NavbarContent: React.FC<NavbarContentProps> = ({ showIconsOnly }) => {
  const MenuItems = [
    {
      icon: FaHome,
      text: "Home",
      path: "/",
    },
    {
      icon: BsFillBackpack2Fill,
      text: "Inventory",
      path: "/inventory",
    },
    {
      icon: BsGraphUpArrow,
      text: "Investments",
      path: "/investments",
    },
    {
      icon: MdOutlinePriceCheck,
      text: "Item Price",
      path: "/item-price",
    },
    {
      icon: FaHistory,
      text: "Market data",
      path: "/market-data",
    },
  ];

  return (
    <>
      {MenuItems.map((element, index) => (
        <NavLink
          key={index}
          to={element.path}
          className={({
            isActive,
          }) => `p-4 text-xl flex flex-row items-center overflow-hidden gap-x-2 cursor-pointer hover:bg-gray-700 
        relative min-h-[60px] ${isActive && "bg-gray-700"}  ${
            showIconsOnly ? "justify-center" : "justify-start"
          }
        `}
        >
          <Ripple duration={1200} velocity={500} />
          <div className="size-[22px]">
            {element.icon && <element.icon size={22} />}
          </div>

          {!showIconsOnly && (
            <span className={`flex-wrap overflow-hidden whitespace-nowrap`}>
              {element.text}
            </span>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default NavbarContent;
