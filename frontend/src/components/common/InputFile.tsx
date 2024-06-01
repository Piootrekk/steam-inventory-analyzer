import { forwardRef } from "react";

type InputFileProps = {
  label: string;
  widthClassName?: string;
  error?: string;
  fileTypes?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, widthClassName = "w-full", error, fileTypes, ...props }, ref) => {
    return (
      <div className={`mb-4 ${widthClassName}`}>
        <label className="block text-sm font-medium text-gray-500 mb-1 mx-1">
          {label}
        </label>
        <input
          ref={ref}
          type="file"
          accept={fileTypes}
          className={`
          text-gray-100 px-4 py-2 placeholder-transparent bg-slate-700 border-b-2 border-gray-400 rounded-md
          hidden-scrollbar focus:outline-none resize-none
          
          ${error && "border-red-500"}
        `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default InputFile;
