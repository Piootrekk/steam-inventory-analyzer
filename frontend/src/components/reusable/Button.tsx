import React, { useRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ onClick, className, ...props }: ButtonProps) => {
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    rippleEffect(event);
    if (onClick) {
      onClick(event);
    }
  };

  // DO ZREFAKTORYZOWANIA KIEDYŚTAM NA BARDZIEJ REACTOWY KOD

  const rippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add(
      "absolute",
      "rounded-full",
      "scale-0",
      "animate-ripple",
      "bg-slate-300",
      "pointer-events-none"
    );

    btn.appendChild(circle);
    rippleRef.current = circle;
  };

  return (
    <button
      {...props}
      type="button"
      className={`rounded-xl overflow-hidden shadow relative bg-blue-700
      text-white hover:bg-opacity-80 border border-blue-950 focus:outline-none ${className}`}
      onClick={handleClick}
    ></button>
  );
};

export default Button;
