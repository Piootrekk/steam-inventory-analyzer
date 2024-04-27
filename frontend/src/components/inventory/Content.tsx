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
        <p className="text-base ">Selected item: {detatails?.selectedItem}</p>
      );
    } else {
      return <p className="text-base text-ellipsis">No item selected</p>;
    }
  };
  return (
    <div className={`flex-col overflow-hidden ${className}`}>
      <div className="flex flex-col justify-center items-center  my-4 py-2 ">
        <h2 className="text-2xl">Inventory fetched {detatails?.status}</h2>
        <p className="text-xl">Details:</p>
        {detatails?.game ? (
          <p className="text-base text-ellipsis">
            Game: {detatails?.game.toUpperCase()}
          </p>
        ) : (
          <p className="text-base text-ellipsis">Game: No game selected</p>
        )}
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
