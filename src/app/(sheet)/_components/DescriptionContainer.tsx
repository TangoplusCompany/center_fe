import React from "react";

const DescriptionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-full relative  ${className}`}>
      {children}
      <div className="absolute bottom-0 left-0 w-full h-0.5 print:bg-gradient-to-l bg-gradient-to-l to-[#2F52D3] from-[#010928]"></div>
    </div>
  );
};

export default DescriptionContainer;
