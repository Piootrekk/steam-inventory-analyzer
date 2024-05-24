import { LuFileSpreadsheet } from "react-icons/lu";
import InputCustom from "../common/Input/InputCustom";

type FinishInvestingProps = {};

const FinishInvesting: React.FC<FinishInvestingProps> = () => {
  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl">
        <LuFileSpreadsheet size={24} className="self-center" />
        Type Spreadsheet name:
      </h2>

      <InputCustom label="asde" widthClassName="w-1/5  min-w-48" />
    </>
  );
};

export default FinishInvesting;
