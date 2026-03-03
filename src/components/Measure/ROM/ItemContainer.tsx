
import { IMeasureROMItem } from "@/types/measure";
import ROMItemCard from "./ItemCard";
import { ComparePair } from "@/types/compare";

export interface ROMItemContainerProps {
  datas : IMeasureROMItem[],
  onROMItemSelect ?: (romSn: ComparePair) => void;
}


const ROM_PAIRS: [number, number][] = [
  [13, 14], [21, 35], [22, 36],  // 목
  [15, 16], [23, 37], [24, 38],  // 어깨
  [25, 39], [26, 40], [27, 41],   // 팔꿈치
  [17, 18], [28, 42], [29, 43], // 몸통
  [19, 20], [30, 44], [31, 45], // 골반 
  [32, 46], [49, 50], // 무릎
  [33, 47], [34, 48]
];

const SORT_ORDER = ROM_PAIRS.flat().reduce((acc, type, index) => {
  acc[type] = index;
  return acc;
}, {} as Record<number, number>);

export const ROMItemContainer = ({
  datas,
  onROMItemSelect
}: ROMItemContainerProps) => {
  const sortedDatas = [...datas].sort((a, b) => {
    const orderA = SORT_ORDER[a.measure_type] ?? 999; 
    const orderB = SORT_ORDER[b.measure_type] ?? 999;
    return orderA - orderB;
  });

  const handleROMItemSelect = (measureType: number) => {
    const pair = ROM_PAIRS.find(([a, b]) => a === measureType || b === measureType);

    const romPair : ComparePair = measureType <= 21 ?
      // 정면일경우 그대로 좌우측면일 경우 romSn을 반대로 넣어 관절 방향 매칭
      [
        datas.find((item) => item.measure_type === pair?.[0])?.sn,
        datas.find((item) => item.measure_type === pair?.[1])?.sn,
      ]
     :
      [
        datas.find((item) => item.measure_type === pair?.[1])?.sn,
        datas.find((item) => item.measure_type === pair?.[0])?.sn,
      ]
    onROMItemSelect?.(romPair)
  }
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {sortedDatas.map((item, index) => (
        <ROMItemCard key={index} romItem={item} handleROMItemSelect={handleROMItemSelect} />
      ))}
    </div>
  );
};

export default ROMItemContainer;