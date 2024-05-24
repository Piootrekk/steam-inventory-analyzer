import { useEffect, useState } from "react";

type RippleProps = {
  duration: number;
  velocity?: 500 | 1000 | 1500 | 3000;
};

type RippleType = {
  x: number;
  y: number;
  size: number;
};

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useEffect(() => {
    let bounce = rippleCount;
    if (bounce > 0) {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 4);
    }
    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple: React.FC<RippleProps> = ({ duration, velocity }) => {
  const [rippleArray, setRippleArray] = useState<RippleType[]>([]);
  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });
  const addRipple = (event: React.MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };
    setRippleArray([...rippleArray, newRipple]);
  };

  const rippleEffect = () => {
    switch (velocity) {
      case 500:
        return "animate-ripple-500";
      case 1000:
        return "animate-ripple-1000";
      case 1500:
        return "animate-ripple-1500";
      case 3000:
        return "animate-ripple-3000";
      case undefined:
      default:
        return "animate-ripple";
    }
  };

  return (
    <div
      className="absolute top-0 right-0 bottom-0 left-0"
      onMouseDown={addRipple}
    >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => (
          <span
            key={"ripple" + index}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
            className={`absolute rounded-full scale-0 ${rippleEffect()} bg-slate-300 pointer-events-none`}
          />
        ))}
    </div>
  );
};

export default Ripple;
