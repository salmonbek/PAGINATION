import { useEffect, useState } from "react";
import request from "../server";

const useFetch = ({ url, params, initialData = null }) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  function refetch() {
    setCallback(!callback);
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const getData = async () => {
      try {
        setLoading(true);
        let { data } = await request.get(url, {
          params: params ? JSON.parse(params) : {},
          signal,
        });
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();

    return () => controller.abort();
  }, [url, params, callback]);

  return { data, error, loading, refetch };
};

export default useFetch;
