
export const ROMRawDataUnit = ({

}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-[25%_25%_50%] items-center border-b-2 border-sub200 dark:bodrer bg-sub100 dark:bg-muted p-4">
        <span className="">최대 각도</span>
        <span className="">단계</span>
        <span className="">설명</span>
      </div>

      <div className="grid grid-cols-[25%_25%_50%] items-center border-b-2 border-sub200 dark:bodrer bg-sub100 dark:bg-muted p-4">
        <span className="">172.1º</span>
        <span className="">매우 우수</span>
        <span className="">팔이 귀 옆까지 들어올려지며 움직임이 부드럽고 안정적입니다</span>
      </div>


      <div className="grid grid-cols-4 w-full h-full gap-2 items-center">
        <div className="flex flex-col gap-1 w-full item-center">
          <span>매우 우수</span>
          <span>170º이상</span>
        </div>
        <div className="flex flex-col gap-1 w-full item-center">
          <span>정상</span>
          <span>150º~170º</span>
        </div>
        <div className="flex flex-col gap-1 w-full item-center">
          <span>주의</span>
          <span>120º~150º</span>
        </div>
        <div className="flex flex-col gap-1 w-full item-center">
          <span>위험</span>
          <span>120º미만</span>
        </div>

      </div>
    </div>
  );
};

export default ROMRawDataUnit;