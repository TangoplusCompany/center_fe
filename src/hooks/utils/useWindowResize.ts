import { useState, useEffect } from "react";

/**
 * 창 크기 변경 훅
 * @returns 창 크기
 */
export const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 초기값 설정을 위해 한 번 호출 (optional)
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};
