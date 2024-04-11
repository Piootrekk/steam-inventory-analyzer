import { useEffect } from "react";

const useEventListener = (
  eventName: string,
  handler: any,
  element = window || document || undefined
) => {
  useEffect(() => {
    element.addEventListener(eventName, handler);

    return () => {
      element.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, element]);
};

export default useEventListener;
