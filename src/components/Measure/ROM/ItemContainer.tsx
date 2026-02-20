
import { IMeasureROMItem } from "@/types/measure";
import ROMItemCard from "./ItemCard";
import { CompareSlot } from "@/types/compare";

export interface ROMItemContainerProps {
  datas : IMeasureROMItem[],
  onCompareDialogOpen: (currenSlot: CompareSlot, measureType: number) => void;
  onROMItemSelect ?: (romSn: number) => void;
}

export const ROMItemContainer = ({
  datas,
  onCompareDialogOpen,
  onROMItemSelect
}: ROMItemContainerProps) => {

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {datas.map((item, index) => (
        <ROMItemCard key={index} romItem={item} onCompareDialogOpen={onCompareDialogOpen} onROMItemSelect={onROMItemSelect} />
      ))}
    </div>
  );
};

export default ROMItemContainer;