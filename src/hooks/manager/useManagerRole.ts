import { useState } from "react";

export const useManagerRole = (initialRole: number = 3) => {
  const [role, setRole] = useState<number>(initialRole);

  const handleRoleChange = (newRole: number) => {
    setRole(newRole);
  };

  return { role, handleRoleChange };
};
