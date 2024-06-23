import { BiError } from "react-icons/bi";

type ErrorViewProps = {
  error: any;
};

const ErrorView: React.FC<ErrorViewProps> = ({ error }) => {
  return (
    <div className="flex justify-center items-center h-screen flex-row text-red-700 lg:text-4xl md:text-4xl">
      <BiError className="size-28" />
      <p>Error: Server Offline :C - {error}</p>
      <BiError className="size-28" />
    </div>
  );
};

export default ErrorView;
