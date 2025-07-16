import { useState } from "react";

/**
 * 매니저 등급 관리 훅
 * @param initialRole 초기 등급
 * @returns 등급 상태와 등급 변경 핸들러
 */
export const useManagerRole = (initialRole: number = 3) => {
  const [role, setRole] = useState<number>(initialRole);

  const handleRoleChange = (newRole: number) => {
    setRole(newRole);
  };

  return { role, handleRoleChange };
};
