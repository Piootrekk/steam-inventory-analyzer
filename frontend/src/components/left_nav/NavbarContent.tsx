import { BsFillBackpack2Fill, BsGraphUpArrow } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdOutlinePriceCheck } from "react-icons/md";
import { DropMenuContentProps } from "../../types/menuTypes";
import { useNavigate } from "react-router-dom";

const NavbarContent = () => {
  const navigate = useNavigate();

  const MenuItems: DropMenuContentProps[] = [
    {
      icon: FaHome,
      text: "Dashboard",
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
      onClick: () => console.log("Investments"),
    },
    {
      icon: MdOutlinePriceCheck,
      text: "Item Price",
      onClick: () => console.log("Item Price"),
    },
  ];

  return (
    <>
      {MenuItems.map((element, index) => (
        <li
          key={index}
          onClick={element.onClick}
          className="p-4 text-xl flex flex-row gap-x-2 cursor-pointer hover:bg-gray-700"
        >
          {element.icon && <element.icon size={25} />}
          {element.text}
        </li>
      ))}
    </>
  );
};

export default NavbarContent;
