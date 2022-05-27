export enum ResponseStatus {
  FAIL = "fail",
  SUCCESS = "success",
}

export type SuccessResponse<T> = {
  data: T;
  status: ResponseStatus.SUCCESS;
};
export type FailResponse = {
  data: string;
  status: ResponseStatus.FAIL;
};

export type ResponseType<T> = SuccessResponse<T> | FailResponse;

/* CREATE RESPONSE */

// -- Factories
export const createSuccessResponse = <T>(data: T): SuccessResponse<T> => ({
  data: data,
  status: ResponseStatus.SUCCESS,
});

export const createFailResponse = (error: string): FailResponse => ({
  data: error,
  status: ResponseStatus.FAIL,
});

// -- Predicates
export const isSuccessResponse = <T>(
  data: ResponseType<T>
): data is SuccessResponse<T> => {
  if (data.status === ResponseStatus.SUCCESS) return true;
  return false;
};
export const isFailResponse = <T>(
  data: ResponseType<T>
): data is FailResponse => {
  if (data.status === ResponseStatus.FAIL) return true;
  return false;
};
