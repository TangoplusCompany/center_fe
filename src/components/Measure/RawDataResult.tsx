"use-client";

export interface IStaticRawDataProps {
  title: string;
  comment: string;
  level: number;
  value0: number;
  value0Subtitle: string; // 왼쪽: 오른쪽:
  value1: number | null;
  value1SubTitle: string | null;
}


export const RawDataResult = (
  {
    data
  } : 
  {
    data: IStaticRawDataProps
  }
) => {
  
  const levelstring = {
    0: "정상",
    1: "주의",
    2: "위험"
  }[data.level] ?? "정상";

  const borderCondition = {
    정상: "border-sub300/50",
    주의: "border-warning/50",
    위험: "border-danger/50",
  }[levelstring] ?? "bg-primary-foreground";
  const bgCondition = {
    정상: "border-sub300/50",
    주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
    위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  }[levelstring] ?? "bg-primary-foreground";
   
  
  const textCondition = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[levelstring] ?? "bg-primary-foreground";
  const textBgCondition = {
    정상: "bg-sub300",
    주의: "bg-warning",
    위험: "bg-danger",
  }[levelstring] ?? "bg-primary-foreground";
  const img = {
  정상: "/icons/ic_normal.svg",
  주의: "/icons/ic_warning.svg",
  위험: "/icons/ic_heart.svg",
}[levelstring] ?? "/icons/ic_default.svg";

  return (
    <div className={`flex flex-col gap-4 rounded-2xl border-2 ${borderCondition} ${bgCondition} shadow-[inset_0_2px_4px_rgba(255,255,255,0.25)] px-4 py-4`}>
      <div className="flex gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/images/measure_default.png"}
          alt="원시데이터 이미지"
          className="w-24 h-24 p-1 rounded-md border bg-accent"
          onError={(e) => {
            e.currentTarget.src = "/images/measure_default.png";
          }}
        />
        <div className="grid grid-rows-[1fr,2fr] flex-1 h-24">
          {/* 1/3 영역: title */}
          <div className="flex justify-between items-center">
            <h2 className={`text-lg font-semibold ${textCondition}`}>{data.title}</h2>
            <span
              className={`
                inline-flex items-center gap-1.5
                px-3 py-1 whitespace-nowrap flex-shrink-0
                ${textBgCondition}
                text-white text-sm font-semibold rounded-xl
              `}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt="상태 아이콘"
                className="w-4 h-4"
              />
              <span>{levelstring}</span>
            </span>

          </div>
          
          {/* 2/3 영역: values - vertical center */}
          <div className="flex flex-col justify-center">
            <div className="text-sm">{data.value0Subtitle}: {data.value0}</div>
            {data.value1 !== null && data.value1SubTitle && (
              <div className="text-sm">{data.value1SubTitle}: {data.value1}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className={`w-1 h-4 ${textBgCondition} rounded-full`}></div>
        <div className={`flex text-sm text-secondary ${textCondition}`}>
          {data.comment}
        </div>
      </div>
    </div>
  );
}


export default RawDataResult;
