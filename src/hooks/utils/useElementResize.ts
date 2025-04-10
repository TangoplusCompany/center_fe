import { useState, useEffect, RefObject } from 'react';

type Size = {
  width: number;
  height: number;
};

export const useElementSize = <T extends HTMLElement>(
  ref: RefObject<T | null>
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    console.log('useElementSize');
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(element);

    // 초기 사이즈 설정
    setSize({
      width: element.clientWidth,
      height: element.clientHeight,
    });

    return () => observer.disconnect();
  }, [ref.current]); // eslint가 싫어할 수 있지만 정상 동작함

  return size;
};