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
  const updateDataRef = useRef(setData);
  const [error, setError] = useState<FailResponse>();
  const [loading, setLoading] = useState(false);

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

  // This causes infinite rerenders. Needs investigation
  // useEffect(() => {
  //   fnRef.current = fetchFn;
  // }, [fetchFn]);

  useEffect(() => {
    setLoading(true);
    fetcher();
  }, [fetcher]);

  return {
    data,
    updateData: updateDataRef.current,
    updateError: setError,
    loading,
    error,
    // Couldn't provide the refetchFn because of infinite rerenders
    // refetch: fnRef.current,
  };
};
