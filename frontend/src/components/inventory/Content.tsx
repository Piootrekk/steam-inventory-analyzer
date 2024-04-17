import React from "react";

type ContentDetailsProps = {
  children?: React.ReactNode;
  className?: string;
  detatails?: {
    totalQuantity?: number;
    game?: string;
    status?: string;
    selectedItem?: string | null;
  };
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
  children,
  className,
  detatails,
}) => {
  const textDetails = () => {
    if (!detatails?.selectedItem && !detatails?.totalQuantity) {
      return <p className="text-base"></p>;
    } else if (detatails?.selectedItem && detatails?.totalQuantity !== 0) {
      return (
        <p className="text-base">Selected item: {detatails?.selectedItem}</p>
      );
    } else {
      return <p className="text-base">No item selected</p>;
    }
  };
  return (
    <div
      className={`border-gray-600 bg-gray-800 rounded-xl min-w-max mx-12 px-4 overflow-hidden max-w-full flex-col ${className}`}
    >
      <div className="flex flex-col justify-center items-center border-b border-gray-600 mb-4 py-2 ">
        <h2 className="text-2xl">Inventory fetched {detatails?.status}</h2>
        <p className="text-xl">Details:</p>
        {detatails?.totalQuantity ? (
          <p className="text-base">
            Total quantity: {detatails?.totalQuantity}
          </p>
        ) : (
          <p className="text-base"> Total quantity: 0</p>
        )}
        {textDetails()}
      </div>
      {children}
    </div>
  );
};

export default ContentDetails;
