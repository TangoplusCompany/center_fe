import React from "react";
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
    3: [13, 14, 15, 16], 
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
  const sortedData = React.useMemo(() => {
    const order = ['코', '머리', '어깨', '팔꿈치', '몸', '정면', '골반', '무릎', '발목'];
    
    return [...filteredData].sort((a, b) => {
      const aUnit = a.measure_unit ?? '';
      const bUnit = b.measure_unit ?? '';
      
      // 각 키워드의 인덱스와 문자열 내 위치 찾기
      let aOrderIndex = -1;
      let aPosition = Infinity;
      let bOrderIndex = -1;
      let bPosition = Infinity;
      
      order.forEach((word, idx) => {
        const aPosInString = aUnit.indexOf(word);
        const bPosInString = bUnit.indexOf(word);
        
        if (aPosInString !== -1 && (aOrderIndex === -1 || idx < aOrderIndex)) {
          aOrderIndex = idx;
          aPosition = aPosInString;
        }
        if (bPosInString !== -1 && (bOrderIndex === -1 || idx < bOrderIndex)) {
          bOrderIndex = idx;
          bPosition = bPosInString;
        }
      });
      
      // 둘 다 order에 있으면
      if (aOrderIndex !== -1 && bOrderIndex !== -1) {
        // 같은 키워드면 위치로 비교
        if (aOrderIndex === bOrderIndex) {
          return aPosition - bPosition;
        }
        // 다른 키워드면 order 순서로
        return aOrderIndex - bOrderIndex;
      }
      
      // a만 order에 있으면 a를 앞으로
      if (aOrderIndex !== -1) return -1;
      
      // b만 order에 있으면 b를 앞으로
      if (bOrderIndex !== -1) return 1;
      
      // 둘 다 order에 없으면 가나다 순
      return aUnit.localeCompare(bUnit, 'ko');
    });
  }, [filteredData]);

  return (
    <div>
      <div className={`${
        isCompare === 0 
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
          : 'flex flex-col gap-4'
      }`}>
        {sortedData.map((data, idx) => (
          <RawDataResult key={idx} data={data} />
        ))}
      </div>
    </div>
  );
};

export default RawDataDetailContainer;