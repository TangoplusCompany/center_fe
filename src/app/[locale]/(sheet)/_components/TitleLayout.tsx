import React from "react";

const TitleLayout = ({
  title,
  description = "",
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={`${className ?? ""} flex gap-4`}>
      <div className="w-1 h-9 bg-[#2F52D3] rounded-[1px]"></div>
      <div className="flex-1 flex items-end border-b border-[#AEAEAE] gap-1">
        <p className="text-[28px] leading-[42px] font-bold text-[#2F52D3]">
          {title}
        </p>
        <p className="text-xs text-[#606060] pb-1">{description}</p>
      </div>
    </div>
  );
};

export default TitleLayout;
