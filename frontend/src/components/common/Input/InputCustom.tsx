import { forwardRef } from "react";

type InputCustomProps = {
  label: string;
  widthClassName?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  ({ label, widthClassName, error, ...props }, ref) => {
    return (
      <div className={`relative ${widthClassName}`}>
        <input
          id={label}
          name={label}
          className={` ${
            error ? " border-2 border-red-500 " : "border-b-2 border-gray-400"
          }
            shadow-sm w-full mx-auto pl-4 rounded-md peer h-10  bg-slate-700
            text-gray-100 placeholder-transparent focus:outline-none
            focus:border-gray-400 focus:border-b-2 transition-colors `}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={label}
          className={`cursor-text absolute left-3 -top-5 ${
            error
              ? "text-red-800 peer-placeholder-shown:text-red-800"
              : "text-gray-100 peer-placeholder-shown:text-gray-100"
          } text-sm transition-all peer-placeholder-shown:text-base
            peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-100 peer-focus:text-sm`}
        >
          {label}
        </label>
        {error && <p className="text-red-500 text-sm ">{error}</p>}
      </div>
    );
  }
);

export default InputCustom;
