import { useRef, useState } from "react";
import RawDataDetailContainer from "./RawDataDetailContainer";
import RawDataTab from "./RawDataTab";
import CompareRawDataDetailContainer from "./Compare/CompareRawDataDetailContainer";
import { IUserMeasureDetailData } from "@/types/measure";

export interface CompareRawDataProps {
  mergedDetailData0: IUserMeasureDetailData[];
  mergedDetailData1?: IUserMeasureDetailData[];
  measure_date0: string;
  measure_date1: string
}

const RawDataContainer = ({
  mergedDetailData0,
  mergedDetailData1,
  measure_date0,
  measure_date1,
} :CompareRawDataProps) => {

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
  const mergedDatas : CompareRawDataProps = {
    mergedDetailData0 : mergedDetailData0,
    mergedDetailData1 : mergedDetailData1,
    measure_date0 : measure_date0,
    measure_date1 : measure_date1,
  }
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
          mergedDetailData={mergedDetailData0}
        />
        
        {!mergedDetailData1 ? (
          <RawDataDetailContainer 
            mergedDetailData={mergedDetailData0} 
            selectedPart={selectedPart} 
          />
        ):(
          <CompareRawDataDetailContainer 
          mergedDatas={mergedDatas} 
          selectedPart={selectedPart} 
        />
        )}
      </div>
    </div>
  );
};

export default RawDataContainer;