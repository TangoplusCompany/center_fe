import { useState } from "react";

/**
 * 측정 데이터 개수 관리 훅
 * @returns 측정 데이터 개수 상태와 측정 데이터 개수 변경 핸들러
 */
export const useMeasureCount = () => {
  const [totalItems, setTotalItems] = useState(0);
  const handleTotalItems = (totalItems: number) => {
    setTotalItems(totalItems);
  };
  return { totalItems, handleTotalItems };
};