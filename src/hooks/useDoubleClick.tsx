import { useCallback, useRef } from 'react';

interface UseDoubleClickProps {
  doubleClick: (...args: any) => any;
  click?: (...args: any) => any;
  timeout?: number;
}

const useDoubleClick = ({ doubleClick, click, timeout = 200 }: UseDoubleClickProps) => {
  // we're using useRef here for the useCallback to rememeber the timeout
  const clickTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const clearClickTimeout = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  // return a memoized version of the callback that only changes if one of the dependencies has changed
  return useCallback(
    (event: any) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick]
  );
};

export default useDoubleClick;
