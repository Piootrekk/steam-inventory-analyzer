import React, { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import "./DropDownStyles.css";

export type DropDownMenuProps = {
  isOpen: boolean;
  elements?: React.ReactNode[];
  setIsOpen: (value: boolean) => void;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  isOpen,
  elements,
  setIsOpen,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <div
        className={`flex flex-col dropdownProfile ${
          isOpen ? "dropdownActive" : "dropdownInactive"
        } `}
      >
        {elements?.map((element, index) => (
          <ul className="flex flex-col gap-5" key={index}>
            {element}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;


