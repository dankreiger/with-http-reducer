export interface IAction<T = any> {
  type: T;
}

export interface IAnyAction extends IAction {
  [extraProps: string]: any;
}

export interface IWithHttpReducerInitialState {
  loading: boolean;
  httpError: any;
}

export interface IWithHttpReducerActionTypes {
  BEGIN: string;
  SUCCESS: string;
  FAILURE: string;
}
