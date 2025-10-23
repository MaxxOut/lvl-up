import { useState, useEffect } from 'react';

const useScroll = (elementRef) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const onScroll = () => {
      setOffset(element.scrollTop);
    };

    element.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [elementRef]);

  return offset;
};

export default useScroll;
