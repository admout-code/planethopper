import {
  createFailResponse,
  createSuccessResponse,
  isFailResponse,
  isSuccessResponse,
  ResponseStatus,
} from "../services/responseHandlers";

test("createSuccessResponse with ResponseStatus.SUCCESS", () => {
  expect(
    createSuccessResponse({
      firstName: "Mpamphs",
      lastName: "Sougias",
      age: 12,
    })
  ).toEqual({
    data: {
      firstName: "Mpamphs",
      lastName: "Sougias",
      age: 12,
    },
    status: ResponseStatus.SUCCESS,
  });
});

test("createSuccessResponse with ResponseStatus.FAIL", () => {
  expect(
    createSuccessResponse({
      firstName: "Mpamphs",
      lastName: "Sougias",
      age: 12,
    })
  ).not.toEqual({
    data: {
      firstName: "Mpamphs",
      lastName: "Sougias",
      age: 12,
    },
    status: ResponseStatus.FAIL,
  });
});

test("createFailResponse with ResponseStatus.FAIL", () => {
  expect(createFailResponse("Error message")).toEqual({
    data: "Error message",
    status: ResponseStatus.FAIL,
  });
});

test("createFailResponse with ResponseStatus.SUCCESS", () => {
  expect(createFailResponse("Error message")).not.toEqual({
    data: "Error message",
    status: ResponseStatus.SUCCESS,
  });
});

test("isSuccessResponse to be true", () => {
  const successResponse = createSuccessResponse({
    firstName: "Mpamphs",
    lastName: "Sougias",
    age: 12,
  });
  expect(isSuccessResponse(successResponse)).toBeTruthy();
});

test("isSuccessResponse to be false", () => {
  const failResponse = createFailResponse("Error message");
  expect(isSuccessResponse(failResponse)).toBeFalsy();
});

test("isFailResponse to be true", () => {
  const failResponse = createFailResponse("Error message");
  expect(isFailResponse(failResponse)).toBeTruthy();
});

test("isFailResponse to be false", () => {
  const successResponse = createSuccessResponse({
    firstName: "Mpamphs",
    lastName: "Sougias",
    age: 12,
  });
  expect(isFailResponse(successResponse)).toBeFalsy();
});
