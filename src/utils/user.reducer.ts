import { Reducer } from '../types';
import { AnyAction } from '../interfaces';

export const usersInitialState = { loggedIn: false, currentUser: 'dog' };
const users: Reducer = (state: any = usersInitialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'LOGIN_CURRENT_USER':
      return { ...state, login: true };
    case 'LOGOUT_CURRENT_USER':
      return { ...state, login: false };
    default:
      return state;
  }
};

export default users;
