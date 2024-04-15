import { useState, useEffect } from "react";

export type FetchType = {
  url: string;
  type?:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "CONNECT"
    | "TRACE";
};

const useFetch = ({ url, type = "GET" }: FetchType) => {
  const [data, setData] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | any>(null);
  const [promiseInfo, setPromiseInfo] = useState<null | Response>(null);
  const [trigger, setTrigger] = useState(false);

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
  });

  const activateFetch = () => {
    setTrigger(true);
  };

  return { data, isLoading, error, promiseInfo, activateFetch };
};

export default useFetch;
