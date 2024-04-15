type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  const classes = `shadow-inner shadow-gray-600 w-24 h-24 rounded-lg  flex flex-col justify-center items-center border border-gray-600 ${className}`;

  return <div className={classes}>{children}</div>;
};
export default Card;
