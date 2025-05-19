import React from "react";

const GradientContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-gradient-to-tl from-[#577BFF] to-[#16286A] ${className}`}
    >
      {children}
    </div>
  );
};

export default GradientContainer;
