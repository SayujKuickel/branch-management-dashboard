import { useState, useEffect } from "react";

const useFetchData = (fetchFunction, optionMode) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchFunction(null, null, optionMode);

        const { data } = result.data;
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetchData;
