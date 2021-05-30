interface IEventCallbacks<T = unknown> {
  beginCb: () => void;
  successCb: (response: T) => void;
  failureCb: (error: Error) => void;
  cancelCb?: () => void;
}

/**
 * @note client use only
 * assumes that there is a window api
 * https://developer.mozilla.org/en-US/docs/Web/API/Window
 *
 * @param url
 * @param options
 * @returns a function that aborts the api call
 */
export const abortableFetch = <T = unknown>(
  url: RequestInfo,
  options?: RequestInit
) => ({ beginCb, successCb, failureCb, cancelCb }: IEventCallbacks<T>) => {
  const controller = new AbortController();
  const signal = controller.signal;
  beginCb();

  fetch(url, { ...options, signal })
    .then((response) => response.json() as Promise<T>)
    .then(successCb)
    .catch(failureCb);

  return () => {
    controller.abort();
    typeof cancelCb === 'function' && cancelCb();
  };
};
