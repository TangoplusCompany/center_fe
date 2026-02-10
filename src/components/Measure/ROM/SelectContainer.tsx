import SkeletonBox from "./SkeletonBox";

export interface ROMSelectProps {
  onSelect?: (part: number) => void;
  onROMItemSelect ?: (romSn: number) => void;
}

export const ROMSelectContainer = ({
  onSelect
} : ROMSelectProps) => {
  return (
    <div>
      <SkeletonBox onSelect={onSelect}/>
    </div>
  );
};

export default ROMSelectContainer;