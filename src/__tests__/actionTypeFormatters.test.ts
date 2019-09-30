import {
  withHttpActionType,
  HTTP_BEGIN,
  HTTP_FAILURE,
  HTTP_SUCCESS
} from "../actionTypeFormatters";

describe("HTTP_BEGIN", () => {
  expect(HTTP_BEGIN("users")).toBe("@@http/FETCH_USERS_BEGIN");
  expect(HTTP_BEGIN("")).toBe("@@http/FETCH_BEGIN");
});

describe("HTTP_SUCCESS", () => {
  expect(HTTP_SUCCESS("users")).toBe("@@http/FETCH_USERS_SUCCESS");
  expect(HTTP_SUCCESS("")).toBe("@@http/FETCH_SUCCESS");
});

describe("HTTP_FAILURE", () => {
  expect(HTTP_FAILURE("users")).toBe("@@http/FETCH_USERS_FAILURE");
  expect(HTTP_FAILURE("")).toBe("@@http/FETCH_FAILURE");
});

describe("withHttpActionType", () => {
  it("returns generic actions without argument", () => {
    expect(withHttpActionType()).toEqual({
      BEGIN: "@@http/FETCH_BEGIN",
      FAILURE: "@@http/FETCH_FAILURE",
      SUCCESS: "@@http/FETCH_SUCCESS"
    });
  });
  it("formats a single word", () => {
    expect(withHttpActionType("users")).toEqual({
      BEGIN: "@@http/FETCH_USERS_BEGIN",
      FAILURE: "@@http/FETCH_USERS_FAILURE",
      SUCCESS: "@@http/FETCH_USERS_SUCCESS"
    });
  });
  it("formats camel case to capitalize", () => {
    expect(withHttpActionType("dogPosts")).toEqual({
      BEGIN: "@@http/FETCH_DOG_POSTS_BEGIN",
      FAILURE: "@@http/FETCH_DOG_POSTS_FAILURE",
      SUCCESS: "@@http/FETCH_DOG_POSTS_SUCCESS"
    });
  });
});
