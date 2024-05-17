import { useState, useEffect } from "react";
import {
  setDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localstorage";

const useLocalStorage = <T,>(key: string) => {
  const [value, setValue] = useState<T>(() => {
    return getDataFromLocalStorage<T>(key) || ([] as T);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));

    return () => {
      setDataToLocalStorage(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
