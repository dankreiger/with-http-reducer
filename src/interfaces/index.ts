export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export interface WithHttpReducerInitialState {
  loading: boolean;
  httpError: any;
}

export interface WithHttpReducerActionTypes {
  BEGIN: string;
  SUCCESS: string;
  FAILURE: string;
}
