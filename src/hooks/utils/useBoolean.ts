import { useState } from "react";

/**
 * 불리언 상태 관리 Hooks
 * @param initialValue 초기값
 * @returns 불리언 상태, 불리언 상태 변경 함수
 */
export const useBoolean = (initialValue = false) => {
  const [isBoolean, setIsBoolean] = useState<boolean>(initialValue);

  const setTrue = () => setIsBoolean(true);
  const setFalse = () => setIsBoolean(false);
  const setToggle = () => setIsBoolean((prev) => !prev);

  return { isBoolean, setTrue, setFalse, setToggle };
};
