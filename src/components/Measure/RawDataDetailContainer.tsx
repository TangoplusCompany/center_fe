import RawDataResult, { IStaticRawDataProps } from "./RawDataResult";

const RawDataDetailContainer = ({ 
  mergedDetailData, 
  selectedPart,
  isCompare,
}: {
  mergedDetailData: IStaticRawDataProps[];
  selectedPart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isCompare: 0 | 1;
}) => {

  const partLandmarkMap: { [key: number]: number[] } = {
    0: [], 
    1: [0], 
    2: [11, 12],
    3: [15, 16], 
    4: [23, 24], 
    5: [25, 26], 
    6: [27, 28], 
  };

  const filteredData =
    selectedPart === 0
      ? mergedDetailData // 전체 선택 시 필터링 안 함
      : mergedDetailData.filter((data) =>
          partLandmarkMap[selectedPart]?.includes(data.landmark)
        );

  return (
    <div>
      <div className={`${
        isCompare === 0 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'flex flex-col gap-4'
      }`}>
        {filteredData.map((data, idx) => (
          <RawDataResult key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default RawDataDetailContainer;