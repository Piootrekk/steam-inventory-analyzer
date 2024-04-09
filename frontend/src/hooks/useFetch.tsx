import { useState, useEffect } from "react";

export type FetchType = {
  url: string;
};

const useFetch = ({ url }: FetchType) => {
  const [data, setData] = useState<null | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  const FetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
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
    FetchData();
  }, [url]);
  return { data, isLoading, error };
};
export default useFetch;
