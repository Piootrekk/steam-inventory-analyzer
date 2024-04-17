type CardProps = {
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const Card: React.FC<CardProps> = ({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  const classes = `shadow-inner shadow-gray-600 w-24 h-30 rounded-lg 
   flex flex-col justify-center items-center border border-gray-600 ${className}`;

  return (
    <div
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};
export default Card;
