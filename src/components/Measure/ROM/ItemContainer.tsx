
import { IMeasureROMItem } from "@/types/measure";
import ROMItemCard from "./ItemCard";

export interface ROMItemContainerProps {
  datas : IMeasureROMItem[],
  onROMItemSelect ?: (romSn: number | undefined, isLeft: boolean) => void;
}

export const ROMItemContainer = ({
  datas,
  onROMItemSelect
}: ROMItemContainerProps) => {

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {datas.map((item, index) => (
        <ROMItemCard key={index} romItem={item} onROMItemSelect={onROMItemSelect} idx={index}/>
      ))}
    </div>
  );
};

export default ROMItemContainer;