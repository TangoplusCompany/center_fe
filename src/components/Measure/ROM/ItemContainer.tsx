import { IMeasureROMInfo } from "@/types/measure";
import ROMItemCard from "./ItemCard";
import { CompareSlot } from "@/types/compare";

export interface ROMItemContainerProps {
  datas : IMeasureROMInfo[],
  onCompareDialogOpen: (currenSlot: CompareSlot) => void;
  onROMItemSelect ?: (romSn: number) => void;
}

export const ROMItemContainer = ({
  datas,
  onCompareDialogOpen,
  onROMItemSelect
}: ROMItemContainerProps) => {

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {datas.map((info, index) => (
        <ROMItemCard key={index} romInfo={info} onCompareDialogOpen={onCompareDialogOpen} onROMItemSelect={onROMItemSelect} />
      ))}
    </div>
  );
};

export default ROMItemContainer;