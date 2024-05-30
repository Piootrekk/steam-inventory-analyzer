import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import InputCustom from "../common/Input/InputCustom";

const SpreedsheetCreate = forwardRef((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const useValidate = () => {
    const regex = /^[A-Z][a-z]*$/;
    if (!regex.test(inputRef.current!.value)) {
      setError("Name must start with capital letter and contain only letters.");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  useImperativeHandle(ref, () => ({
    validate: useValidate,
    getValue: () => inputRef.current!.value,
  }));

  return (
    <>
      <h2 className="flex flex-row gap-2 text-2xl">
        <LuFileSpreadsheet size={24} className="self-center" />
        Type Spreadsheet name:
      </h2>

      <InputCustom
        label="Spreadsheet Name"
        widthClassName="w-1/5 min-w-48"
        ref={inputRef}
        error={error}
      />
    </>
  );
});

export default SpreedsheetCreate;
