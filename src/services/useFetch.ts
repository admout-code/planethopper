import { useCallback, useEffect, useRef, useState } from "react";
import {
  createFailResponse,
  FailResponse,
  isSuccessResponse,
  ResponseType,
  SuccessResponse,
} from "./responseHandlers";

type DescribeSetter<T> = (
  setData: React.Dispatch<React.SetStateAction<T | undefined>>,
  fetchResponse: SuccessResponse<T>
) => void;

/**
 *
 * @param fetchFn Always memoize your fetchFunction with useCallback to avoid rerenders.
 * @param describeSetter Describe setData behaviour after success fetching data.
 * If describeSetter not provided, default setData will take place instead.
 * @example describeSetter example:
 * (setData, fetchResponse) => setData((prev) => ({...prev, fetchResponse}))
 *
 */

export const useFetch = <T>(
  fetchFn: () => Promise<ResponseType<T>>,
  describeSetter?: DescribeSetter<T>
) => {
  const describerRef = useRef(describeSetter);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<FailResponse>();
  const [loading, setLoading] = useState(false);

  const fetcher = useCallback(async () => {
    try {
      const response = await fetchFn();
      if (isSuccessResponse(response)) {
        return describerRef.current
          ? describerRef.current(setData, response)
          : setData(response.data);
      }
      setError(response);
    } catch (_) {
      setError(
        createFailResponse("There has been a problem with your fetch operation")
      );
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    setLoading(true);
    fetcher();
  }, [fetcher]);

  return {
    data,
    updateData: setData,
    updateError: setError,
    loading,
    error,
    refetch: fetchFn,
  };
};
