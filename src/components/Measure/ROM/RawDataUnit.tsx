import { IMeasureROMItemCardData } from "@/types/measure";



export const ROMRawDataUnit = ({
  data
}: {
  data: IMeasureROMItemCardData
}) => {
  const romStateMap : Record<number, string> = {
    0: "위험",
    1: "주의",
    2: "정상",
    3: "매우 우수"
  };
  const romState = romStateMap[data.score] ?? "정상";
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div>
        <div className="grid grid-cols-[25%_25%_50%] items-center border-b-2 border-sub200 dark:bodrer bg-sub100 dark:bg-muted py-4">
          <div className="h-full flex items-center justify-center">최대 각도</div>
          <div className="h-full flex items-center justify-center">단계</div>
          <div className="h-full flex pl-2">설명</div>
        </div>

        <div className="grid grid-cols-[25%_25%_50%] items-center dark:border dark:bg-muted divide-x-2 divide-sub200">
          <div className="h-full flex items-center justify-center">{data.value_1_max}º</div>
          <div className="h-full flex items-center justify-center">{romState}</div>
          <div className="h-full flex items-center px-2 py-1">{data.description}</div>
        </div>
      </div>
    </div>
  );
};

export default ROMRawDataUnit;