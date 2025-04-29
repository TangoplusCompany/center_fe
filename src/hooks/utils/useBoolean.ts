import { useState } from "react";

export const useBoolean = (initialValue = false) => {
  const [isBoolean, setIsBoolean] = useState<boolean>(initialValue);

  const setTrue = () => setIsBoolean(true);
  const setFalse = () => setIsBoolean(false);
  const setToggle = () => setIsBoolean((prev) => !prev);

  return { isBoolean, setTrue, setFalse, setToggle };
};
