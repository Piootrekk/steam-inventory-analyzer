import React from "react";

type ContentDetailsProps = {
  children?: React.ReactNode;
  className?: string;
  detatails?: {
    totalQuantity: number;
    game: string;
  };
};

const ContentDetails: React.FC<ContentDetailsProps> = ({
  children,
  className,
  detatails,
}) => {
  return (
    <div
      className={`border-gray-600 bg-gray-800 rounded-xl min-w-max mx-12 px-4 ${className}`}
    >
      <div className="flex flex-col justify-center items-center border-b border-gray-600 mb-4 pb-2">
        <h2>Fetched Inventory</h2>
        <p>Details:</p>
        <p>{detatails?.game}</p>
        <p>{detatails?.totalQuantity}</p>
      </div>
      {children}
    </div>
  );
};

export default ContentDetails;
