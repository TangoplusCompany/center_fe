import { useState, useEffect, RefObject } from "react";

type Size = {
  width: number;
  height: number;
};

/**
 * 엘리먼트 크기 조회 Hooks
 *
 * HTML Element의 크기를 조회하는 Hooks
 * @param ref 엘리먼트 참조
 * @returns 엘리먼트 크기 (width, height)
 */
export const useElementSize = <T extends HTMLElement>(
  ref: RefObject<T | null>,
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
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
  }, [ref]); // ref 객체 자체를 의존성으로 사용

  return size;
};
