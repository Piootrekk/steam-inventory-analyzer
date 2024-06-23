import React, { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import "./DropDownStyles.css";

export type DropDownMenuProps = {
  isOpen: boolean;
  elements?: React.ReactNode[];
  setIsOpen: (value: boolean) => void;
  className?: string;
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  isOpen,
  elements,
  setIsOpen,
  className,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={menuRef}>
      <div
        className={`right-[-1.2rem] ${className} flex flex-col dropdownProfile ${
          isOpen ? "dropdownActive" : "dropdownInactive"
        }
        `}
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
