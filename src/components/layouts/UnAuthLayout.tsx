import React from "react";

const UnAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen w-full">{children}</main>
  );
};

export default UnAuthLayout;
