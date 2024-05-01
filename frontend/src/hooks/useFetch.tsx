import { useState, useEffect } from "react";

type FetchType = {
  url: string;
  type?: string;
};

type FetchData<T> = {
  data: T | null;
  isLoading: boolean;
  error: any | null;
  promiseInfo: Response | null;
  activateFetch: () => void;
  setData: (data: T) => void;
};

const useFetch = <T,>({ url, type = "GET" }: FetchType): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [promiseInfo, setPromiseInfo] = useState<Response | null>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

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
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (trigger) {
      fetchData();
      console.log("Fetching data");
      setTrigger(false);
    }
  }, [trigger]);

  const activateFetch = () => {
    setTrigger(true);
  };

  return { data, isLoading, error, promiseInfo, activateFetch, setData };
};

export default useFetch;
