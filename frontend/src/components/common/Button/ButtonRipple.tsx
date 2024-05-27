type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonRipple: React.FC<ButtonProps> = ({
  onClick,
  className,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      {...props}
      type="button"
      className={`rounded-md overflow-hidden shadow relative bg-blue-700 text-xl
          text-white hover:bg-opacity-80 border border-blue-950 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={handleClick}
    ></button>
  );
};

export default ButtonRipple;
