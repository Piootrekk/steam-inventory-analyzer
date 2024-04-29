import { FaHome, FaHistory } from "react-icons/fa";
import { BsFillBackpack2Fill, BsGraphUpArrow } from "react-icons/bs";
import { MdOutlinePriceCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Ripple from "../common/Button/Ripple";

type NavbarContentProps = {
  showIconsOnly: boolean;
};

const NavbarContent: React.FC<NavbarContentProps> = ({ showIconsOnly }) => {
  const navigate = useNavigate();

  const MenuItems = [
    {
      icon: FaHome,
      text: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: BsFillBackpack2Fill,
      text: "Inventory",
      onClick: () => navigate("/inventory"),
    },
    {
      icon: BsGraphUpArrow,
      text: "Investments",
      onClick: () => navigate("/investments"),
    },
    {
      icon: MdOutlinePriceCheck,
      text: "Item Price",
      onClick: () => navigate("/item-price"),
    },
    {
      icon: FaHistory,
      text: "Market data",
      onClick: () => navigate("/market-data"),
    },
  ];

  return (
    <>
      {MenuItems.map((element, index) => (
        <li
          key={index}
          onClick={element.onClick}
          className={`p-4 text-xl flex flex-row items-center overflow-hidden gap-x-2 cursor-pointer hover:bg-gray-700 
          relative min-h-[60px]
          `}
        >
          <Ripple duration={500} velocity={500} />
          <div className="size-[22px]">
            {element.icon && <element.icon size={22} />}
          </div>

          {!showIconsOnly && (
            <span className={`flex-wrap overflow-hidden whitespace-nowrap`}>
              {element.text}
            </span>
          )}
        </li>
      ))}
    </>
  );
};

export default NavbarContent;
