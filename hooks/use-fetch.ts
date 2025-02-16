import { useState } from "react";

const useFetch = (cb: (...args: any[]) => any) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;