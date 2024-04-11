import React from "react";
import "./DropDownStyles.css";

export type DropDownMenuProps = {
  isOpen: boolean;
  elements?: React.ReactNode[];
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({ isOpen, elements }) => {
  return (
    <div className="relative">
      {isOpen && (
        <div className="flex flex-col dropdownProfile">
          {elements?.map((element, index) => (
            <ul className="flex flex-col gap-5" key={index}>
              {element}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
