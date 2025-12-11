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

  return (
    <div className="flex flex-col gap-4 rounded-3xl border px-4 py-4">
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
            <h2 className="text-xl font-semibold">{data.title}</h2>
            <span className={`inline-block px-3 py-1 ${
              data.level === 2 ? "bg-danger" : "bg-warning"
            } text-white text-sm font-semibold rounded-xl`}>{levelstring}</span>
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

      <div className="flex text-sm text-gray-700 justify-center">{data.comment}</div>
    </div>
  );
}


export default RawDataResult;
