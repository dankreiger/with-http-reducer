import { IAnyAction } from "../interfaces";
import { Reducer } from "../types";

export const usersInitialState = { loggedIn: false, currentUser: "dog" };
const users: Reducer = (state: any = usersInitialState, action: IAnyAction) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "LOGIN_CURRENT_USER":
      return { ...state, login: true };
    case "LOGOUT_CURRENT_USER":
      return { ...state, login: false };
    default:
      return state;
  }
};

export default users;
