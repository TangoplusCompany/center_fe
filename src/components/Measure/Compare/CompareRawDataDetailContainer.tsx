import React from "react";
import CompareRawData from "./CompareRawData";
import { IUserMeasureDetailData } from "@/types/measure";

const CompareRawDataDetailContainer = ({ 
  mergedDetailData0, 
  mergedDetailData1,
  selectedPart,
}: {
  mergedDetailData0: IUserMeasureDetailData[];
  mergedDetailData1: IUserMeasureDetailData[];
  selectedPart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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

  const filteredData0 =
    selectedPart === 0
      ? mergedDetailData0
      : mergedDetailData0.filter((data) =>
          partLandmarkMap[selectedPart]?.includes(data.landmark)
        );
        
  const sortedData0 = React.useMemo(() => {
    const order = ['코', '머리', '어깨', '팔꿈치', '몸', '정면', '골반', '무릎', '발목'];
    
    return [...filteredData0].sort((a, b) => {
      const aUnit = a.measure_unit ?? '';
      const bUnit = b.measure_unit ?? '';
      
      const aOrderIndex = order.findIndex(word => aUnit.includes(word));
      const bOrderIndex = order.findIndex(word => bUnit.includes(word));
      
      if (aOrderIndex !== -1 && bOrderIndex !== -1) {
        if (aOrderIndex !== bOrderIndex) {
          return aOrderIndex - bOrderIndex;
        }
        return aUnit.localeCompare(bUnit, 'ko');
      }
      
      if (aOrderIndex !== -1) return -1;
      if (bOrderIndex !== -1) return 1;
      
      return aUnit.localeCompare(bUnit, 'ko');
    });
  }, [filteredData0]);
  const filteredData1 =
    selectedPart === 0
      ? mergedDetailData1
      : mergedDetailData1.filter((data) =>
          partLandmarkMap[selectedPart]?.includes(data.landmark)
        );
        
  const sortedData1 = React.useMemo(() => {
    const order = ['코', '머리', '어깨', '팔꿈치', '몸', '정면', '골반', '무릎', '발목'];
    
    return [...filteredData1].sort((a, b) => {
      const aUnit = a.measure_unit ?? '';
      const bUnit = b.measure_unit ?? '';
      
      const aOrderIndex = order.findIndex(word => aUnit.includes(word));
      const bOrderIndex = order.findIndex(word => bUnit.includes(word));
      
      if (aOrderIndex !== -1 && bOrderIndex !== -1) {
        if (aOrderIndex !== bOrderIndex) {
          return aOrderIndex - bOrderIndex;
        }
        return aUnit.localeCompare(bUnit, 'ko');
      }
      
      if (aOrderIndex !== -1) return -1;
      if (bOrderIndex !== -1) return 1;
      
      return aUnit.localeCompare(bUnit, 'ko');
    });
  }, [filteredData1]);

  return (
    <div className="flex flex-col">
      {(() => {
        const grouped0: (IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData])[] = [];
        const processed0 = new Set<number>();

        sortedData0.forEach((data, idx) => {
          if (processed0.has(idx)) return;

          const sameUnit0 = sortedData0.filter(
            (d, i) => i > idx && d.measure_unit === data.measure_unit && !processed0.has(i)
          );

          if (sameUnit0.length === 0) {
            grouped0.push(data);
            processed0.add(idx);
          } else if (sameUnit0.length === 1) {
            grouped0.push([data, sameUnit0[0]]);
            processed0.add(idx);
            processed0.add(sortedData0.indexOf(sameUnit0[0]));
          } else {
            const pair = sameUnit0.find(d => d.measure_type === data.measure_type);
            if (pair) {
              grouped0.push([data, pair]);
              processed0.add(idx);
              processed0.add(sortedData0.indexOf(pair));
            } else {
              grouped0.push(data);
              processed0.add(idx);
            }
          }
        });

        const grouped1: (IUserMeasureDetailData | [IUserMeasureDetailData, IUserMeasureDetailData])[] = [];
        const processed1 = new Set<number>();

        sortedData1.forEach((data, idx) => {
          if (processed1.has(idx)) return;

          const sameUnit1 = sortedData1.filter(
            (d, i) => i > idx && d.measure_unit === data.measure_unit && !processed1.has(i)
          );

          if (sameUnit1.length === 0) {
            grouped1.push(data);
            processed1.add(idx);
          } else if (sameUnit1.length === 1) {
            grouped1.push([data, sameUnit1[0]]);
            processed1.add(idx);
            processed1.add(sortedData1.indexOf(sameUnit1[0]));
          } else {
            const pair = sameUnit1.find(d => d.measure_type === data.measure_type);
            if (pair) {
              grouped1.push([data, pair]);
              processed1.add(idx);
              processed1.add(sortedData1.indexOf(pair));
            } else {
              grouped1.push(data);
              processed1.add(idx);
            }
          }
        });
        const maxLength = Math.max(grouped0.length, grouped1.length);
        return Array.from({ length: maxLength }, (_, idx) => (
          <CompareRawData 
            key={idx} 
            data0={grouped0[idx]} 
            data1={grouped1[idx]} 
          />
        ));
      })()}
    </div>
  );
};

export default CompareRawDataDetailContainer;