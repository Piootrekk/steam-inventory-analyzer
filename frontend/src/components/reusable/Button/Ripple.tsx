import { useEffect, useState } from "react";

type RippleProps = {
  duration: number;
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

const Ripple: React.FC<RippleProps> = ({ duration }) => {
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
            className="absolute rounded-full scale-0 animate-ripple bg-slate-300 pointer-events-none"
          />
        ))}
    </div>
  );
};

export default Ripple;
