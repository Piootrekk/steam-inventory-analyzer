import { forwardRef } from "react";

type InputCustomProps = {
  label: string;
  widthClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  ({ label, widthClassName, ...props }, ref) => {
    return (
      <div className={`relative ${widthClassName}`}>
        <input
          id={label}
          name={label}
          className={`w-full mx-auto pl-4 rounded-md peer h-10 border-b-2 bg-slate-700 border-gray-400 text-gray-100 placeholder-transparent focus:outline-none focus:border-gray-400 focus:border-b-2 transition-colors`}
          placeholder=" "
          ref={ref}
          {...props}
        />
        <label
          htmlFor={label}
          className="cursor-text absolute left-3 -top-5 text-gray-100 text-sm transition-all peer-placeholder-shown:text-base
           peer-placeholder-shown:text-gray-100 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-100 peer-focus:text-sm"
        >
          {label}
        </label>
      </div>
    );
  }
);

export default InputCustom;
