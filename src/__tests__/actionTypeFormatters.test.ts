import {
  withHttpActionType,
  HTTP_BEGIN,
  HTTP_FAILURE,
  HTTP_SUCCESS,
} from "../actionTypeFormatters";

describe("HTTP_BEGIN", () => {
  expect(HTTP_BEGIN("users")).toBe("@@http/begin/users");
});

describe("HTTP_SUCCESS", () => {
  expect(HTTP_SUCCESS("users")).toBe("@@http/success/users");
});

describe("HTTP_FAILURE", () => {
  expect(HTTP_FAILURE("users")).toBe("@@http/failure/users");
});

describe("withHttpActionType", () => {
  it("formats a single word", () => {
    expect(withHttpActionType("users")).toEqual({
      BEGIN: "@@http/begin/users",
      FAILURE: "@@http/failure/users",
      SUCCESS: "@@http/success/users",
    });
  });
  it("formats camel case to capitalize", () => {
    expect(withHttpActionType("dogPosts")).toEqual({
      BEGIN: "@@http/begin/dogPosts",
      FAILURE: "@@http/failure/dogPosts",
      SUCCESS: "@@http/success/dogPosts",
    });
  });
});
