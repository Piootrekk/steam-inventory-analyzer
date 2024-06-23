import { HiDotsVertical } from "react-icons/hi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { ResponseInvestmentTemplate } from "../../types/mongoResponseTypes";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { InvestmentDetails } from "../../types/investmentFormTypes";
import DropDownMenu from "../common/DropMenu/DropDownMenu";
import { DropMenuContentProps } from "../../types/menuTypes";

const DropMenuContent: React.FC = ({}) => {
  const MenuItems: DropMenuContentProps[] = [
    {
      text: "Template",
      onClick: () => {
        console.log("Template");
      },
    },
    {
      text: "Investments",
      onClick: () => {
        console.log("Investments");
      },
    },
    {
      text: "Edit",
      onClick: () => {
        console.log("Edit");
      },
    },
    {
      text: "Delete",
      onClick: () => {
        console.log("Delete");
      },
    },
  ];
  return (
    <>
      {MenuItems.map((element, index) => (
        <li key={index}>
          <div className="flex flex-row ml-6 mr-10 px-3 items-center cursor-pointer hover:opacity-50 ">
            <span onClick={element.onClick}>{element.text}</span>
          </div>
        </li>
      ))}
    </>
  );
};

const DotsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="flex items-center focus:outline-none pr-2"
        onClick={toggleMenu}
      >
        <HiDotsVertical className="text-2xl" />
      </button>
      <DropDownMenu
        className="right-[-0.2rem] top-7"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        elements={[<DropMenuContent />]}
      />
    </>
  );
};

type InvestmentsDataProps = {
  data: ResponseInvestmentTemplate[];
  setInvestmentDetails: Dispatch<SetStateAction<InvestmentDetails[]>>;
};

const InvestmentsSpreadsheets: React.FC<InvestmentsDataProps> = ({
  data,
  setInvestmentDetails,
}) => {
  const handleInvestmentClick = (investment: InvestmentDetails[]) => {
    setInvestmentDetails(investment);
    console.log(investment);
  };

  return (
    <div className="flex flex-row w-full flex-wrap rounded-md shadow-md border-2 border-[rgb(var(--dark-tertiary))] min-h-10 px-6 py-4 gap-8 justify-center">
      {data?.map((investment, index) => (
        <div
          key={index}
          className="flex flex-row rounded-md shadow-md border-2 border-[rgb(var(--dark-tertiary))] items-center px-2 py-2 min-w-48 "
          onClick={() => handleInvestmentClick(investment.investment)}
        >
          <DotsMenu />
          <div className="flex flex-row justify-center pr-1">
            <LuFileSpreadsheet className="text-xl" />
          </div>
          <p className="text-xl">{investment.spreadsheetName}</p>
        </div>
      ))}
    </div>
  );
};

export default InvestmentsSpreadsheets;
