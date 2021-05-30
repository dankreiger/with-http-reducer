import { timeoutToken } from './timeoutToken';

export const sleep = (ms: number) =>
  new Promise((res) => {
    setTimeout(() => res(timeoutToken), ms);
  });
