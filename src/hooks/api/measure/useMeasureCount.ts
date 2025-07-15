import { useState } from "react";

export const useMeasureCount = () => {
  const [totalItems, setTotalItems] = useState(0);
  const handleTotalItems = (totalItems: number) => {
    setTotalItems(totalItems);
  };
  return { totalItems, handleTotalItems };
};