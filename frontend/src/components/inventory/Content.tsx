import React from "react";

type ContentDetailsProps = {
  children?: React.ReactNode;
  className?: string;
  detatails?: {
    totalQuantity?: number;
    game?: string;
  };
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
  children,
  className,
  detatails,
}) => {
  return (
    <div
      className={`border-gray-600 bg-gray-800 rounded-xl min-w-max mx-12 px-4 overflow-hidden ${className}`}
    >
      <div className="flex flex-col justify-center items-center border-b border-gray-600 mb-4 py-2">
        <h2 className="text-2xl">Inventory fetched successfully!</h2>
        <p className="text-xl">Details:</p>
        <p className="text-xl">
          Total amount of items: {detatails?.totalQuantity}
        </p>
      </div>
      {children}
    </div>
  );
};

export default ContentDetails;
