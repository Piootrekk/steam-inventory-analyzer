import { forwardRef } from "react";
import "./Scroll.css";

type TextAreaProps = {
  label: string;
  widthClassName?: string;
  error?: string;
  schema?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, widthClassName = "w-full", error, schema, ...props }, ref) => {
    return (
      <div className={`mb-4 ${widthClassName}`}>
        <label className="block text-sm font-medium text-gray-500 mb-1 mx-1">
          {label}
        </label>
        <textarea
          ref={ref}
          placeholder="Type here..."
          className={`
          text-gray-100 px-4 py-2 placeholder-transparent bg-slate-700 border-b-2 border-gray-400 rounded-md
          hidden-scrollbar focus:outline-none resize
          min-w-[200px] max-w-full min-h-[50px] 
          ${error && "border-red-500"}
        `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

export default TextArea;
