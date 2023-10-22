import { useRef, useState, useEffect } from 'react';

const useClickOutside = (initialState: boolean) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(initialState);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      handleClickOutside(e);
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return { isVisible, ref, setIsVisible };
};

export default useClickOutside;
