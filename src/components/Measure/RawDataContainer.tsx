import { useRef, useState } from "react";
import { IStaticRawDataProps } from "./RawDataResult";
import RawDataDetailContainer from "./RawDataDetailContainer";
import RawDataTab from "./RawDataTab";


const RawDataContainer = ({
  mergedDetailData,
  isCompare
} :{
  mergedDetailData: IStaticRawDataProps[];
  isCompare: 0 | 1;  
}) => {
  const [selectedPart, setSelectedPart] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectPart = (part: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    setSelectedPart(part);
    
    // 컨테이너 최상단으로 부드럽게 스크롤
    containerRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'nearest',  // 또는 'start'
      inline: 'nearest'
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-4 mb-64">
        <div className="flex items-center gap-3">
          <div className="w-1 h-10 bg-toggleAccent rounded-full"></div>
          <h2 className="text-xl font-semibold text-[#333] dark:text-white">
            측정 결과 부위별 선택 보기
          </h2>
        </div>
        
        <RawDataTab 
          selectedPart={selectedPart} 
          onSelectPart={handleSelectPart} 
        />
        
        <RawDataDetailContainer 
          mergedDetailData={mergedDetailData} 
          selectedPart={selectedPart} 
          isCompare={isCompare}
        />
      </div>
    </div>
  );
};

export default RawDataContainer;