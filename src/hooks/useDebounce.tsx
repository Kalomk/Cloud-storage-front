import { useCallback, useRef } from 'react';

function useDebounceFunc<T>(
  func: () => T | Promise<T>,
  delay?: number,
  async?: boolean
): { debounceFunc: VoidFunction; clearDebounceTimeout: VoidFunction } {
  // we're using useRef here for the useCallback to rememeber the timeout
  const debounceTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const clearDebounceTimeout = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = undefined;
    }
  };
  return {
    debounceFunc: useCallback(() => {
      clearDebounceTimeout();
      debounceTimeout.current = setTimeout(async () => {
        if (async) {
          const asyncValue = await (func as unknown as () => any)();
          asyncValue();
        }
        func();
      }, delay || 500);
    }, [func, async]),
    clearDebounceTimeout,
  };
}

export default useDebounceFunc;
