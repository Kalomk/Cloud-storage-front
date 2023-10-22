import { useState, useEffect } from 'react';

interface DelayedComponentProps {
  conditional?: boolean;
  fallback?: JSX.Element;
  timeout?: number;
  children: JSX.Element;
}

const DelayedComponent: React.FC<DelayedComponentProps> = ({
  conditional = true,
  fallback = null,
  timeout = 2000,
  children,
}) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  let timeoutId: NodeJS.Timeout | null = null; // Declare intervalId here

  useEffect(() => {
    // Use setTimeout to delay the change of showContent state
    if (conditional) {
      timeoutId = setTimeout(() => {
        setIsReady(true); // Set showContent to true after the delay
      }, timeout); // Adjust the timeout duration as needed (in milliseconds)
    }
    setIsReady(false);

    // Clean up the timeout when the component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [conditional]);

  return isReady ? <>{children}</> : fallback;
};

export default DelayedComponent;
