import React from "react";

interface LoginUserCircleProps {
  adminName: string;
  adminRole?: number;
}
const getRoleText = (role?: number): string => {
  switch (role) {
    case 0:
      return "매니저";
    case 1:
      return "센터관리자";
    case 2:
      return "직원"; // 2에 해당하는 역할을 추가하시면 됩니다
    default:
      return "매니저";
  }
};

export default function LoginUserCircle({ adminName, adminRole }: LoginUserCircleProps) {
  const roleText = getRoleText(adminRole);

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {adminName ? adminName.charAt(0).toUpperCase() : "U"}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{adminName || "홍길동"}</span>
        <span className="text-xs text-gray-500">{roleText}</span>
      </div>
    </div>
  );
}