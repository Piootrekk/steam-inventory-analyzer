import { LuFileSpreadsheet } from "react-icons/lu";
import InputCustom from "../common/Input/InputCustom";
import { useRef } from "react";

type SpreedsheetCreateProps = {};

const SpreedsheetCreate: React.FC<SpreedsheetCreateProps> = () => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl">
        <LuFileSpreadsheet size={24} className="self-center" />
        Type Spreadsheet name:
      </h2>

      <InputCustom
        label="Spreadsheet Name"
        widthClassName="w-1/5 min-w-48"
        ref={ref}
      />
    </>
  );
};

export default SpreedsheetCreate;
