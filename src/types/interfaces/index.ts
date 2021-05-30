export interface IWHRInitialState<R> {
  loading: boolean;
  httpError: boolean;
  response?: R;
}

export interface IWHRActionTypes {
  BEGIN: string;
  LOADING: string;
  SUCCESS: string;
  FAILURE: string;
  CANCELLED: string;
}
