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
      <>
        <label className="block text-sm font-medium text-gray-500 mb-1 mx-1">
          {label}
        </label>
        <input
          ref={ref}
          type="file"
          accept={fileTypes}
          className={`
          text-gray-100 px-4 py-2 placeholder-transparent bg-slate-700 border-b-2 border-gray-400 rounded-md
          hidden-scrollbar focus:outline-none resize-none file:mr-4 file:py-2 file:px-4 file:rounded-full
          file:border-0 file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
          
          ${error && "border-red-500"}
        `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </>
    );
  }
);

export default InputFile;
