
export const ROMRawDataUnit = ({

}) => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div>
        <div className="grid grid-cols-[25%_25%_50%] items-center border-b-2 border-sub200 dark:bodrer bg-sub100 dark:bg-muted py-4">
          <div className="h-full flex items-center justify-center">최대 각도</div>
          <div className="h-full flex items-center justify-center">단계</div>
          <div className="h-full flex pl-2">설명</div>
        </div>

        <div className="grid grid-cols-[25%_25%_50%] items-center dark:border dark:bg-muted divide-x-2 divide-sub200">
          <div className="h-full flex items-center justify-center">172.1º</div>
          <div className="h-full flex items-center justify-center">매우 우수</div>
          <div className="h-full flex items-center px-2 py-1">팔이 귀 옆까지 들어올려지며 움직임이 부드럽고 안정적입니다</div>
        </div>
      </div>
    </div>
  );
};

export default ROMRawDataUnit;