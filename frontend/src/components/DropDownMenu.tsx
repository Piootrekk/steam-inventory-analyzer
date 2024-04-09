import React from "react";

export type DropDownMenuProps = {
  isOpen: boolean;
};

// Kiedyś tu dodać propsy do podstron zamiast linków
const DropDownMenu: React.FC<DropDownMenuProps> = ({ isOpen }) => {
  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute z-10 right-0 mt-5 w-48 bg-gray-800 border border-gray-200 rounded shadow-lg">
          <ul>
            <li>
              <button className="flex text-gray-800 hover:bg-gray-900 w-full px-4 py-2 justify-start">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
