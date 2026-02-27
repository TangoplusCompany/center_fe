
import { IMeasureROMItem } from "@/types/measure";
import ROMItemCard from "./ItemCard";
import { ComparePair } from "@/types/compare";

export interface ROMItemContainerProps {
  datas : IMeasureROMItem[],
  onROMItemSelect ?: (romSn: ComparePair) => void;
}

const ROM_PAIRS: [number, number][] = [
  [13, 14], [21, 22], [35, 36],  // 목
  [15, 16], [23, 37], [24, 38],  // 어깨
  [25, 26], [27, 41],   // 팔꿈치
  [17, 18], [28, 42], [29, 43], // 몸통
  [19, 20], [30, 44], [31, 45], // 골반 
  [32, 46], [49, 50], // 무릎
  [33, 47], [34, 48]
];

export const ROMItemContainer = ({
  datas,
  onROMItemSelect
}: ROMItemContainerProps) => {

  const handleROMItemSelect = (measureType: number) => {
    const pair = ROM_PAIRS.find(([a, b]) => a === measureType || b === measureType);

    const romPair : ComparePair = [
      datas.find((item) => item.measure_type === pair?.[0])?.sn,
      datas.find((item) => item.measure_type === pair?.[1])?.sn,
    ]
    onROMItemSelect?.(romPair)
  }
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {datas.map((item, index) => (
        <ROMItemCard key={index} romItem={item} handleROMItemSelect={handleROMItemSelect} />
      ))}
    </div>
  );
};

export default ROMItemContainer;