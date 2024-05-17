import { useState, useEffect } from "react";
import { FetchType, FetchData } from "../types/fetchType";

const useFetch = <T,>({ url, type = "GET" }: FetchType): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [promiseInfo, setPromiseInfo] = useState<Response | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: type,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPromiseInfo(response);
        if (!response.ok) {
          throw new Error(`${response.statusText} (${response.status})`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error, promiseInfo, setData };
};

export default useFetch;
