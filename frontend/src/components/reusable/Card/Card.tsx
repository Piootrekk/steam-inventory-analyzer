type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  const classes = `w-20 h-24 rounded-lg shadow-lg flex flex-col justify-center items-center border border-gray-600 shadow-2xl ${className}`;

  return <div className={classes}>{children}</div>;
};
export default Card;
