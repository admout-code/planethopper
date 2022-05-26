import { useCallback, useEffect, useRef, useState } from "react";
import {
  createFailResponse,
  FailResponse,
  isSuccessResponse,
  ResponseType,
} from "./responseHandlers";

export const useFetch = <T>(fetchFn: () => Promise<ResponseType<T>>) => {
  const fnRef = useRef(fetchFn);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<FailResponse>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fnRef.current = fetchFn;
  }, [fetchFn]);

  const fetcher = useCallback(async () => {
    try {
      const response = await fnRef.current();
      if (isSuccessResponse(response)) {
        return setData(response.data);
      }
      setError(response);
    } catch (_) {
      setError(
        createFailResponse("There has been a problem with your fetch operation")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetcher();
  }, [fetcher]);

  return { data, loading, error, refetch: fetchFn };
};
