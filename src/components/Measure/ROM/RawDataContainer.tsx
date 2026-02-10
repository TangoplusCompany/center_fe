import { IMeasureROMDetail } from "@/types/measure";
import ROMRawDataGraph from "./RawDataGraph";
import ROMRawDataUnit from "./RawDataUnit";



export const ROMRawDataContainer = ({
  // left,
  // right
} : {
  left: IMeasureROMDetail;
  right?: IMeasureROMDetail
}) => {
  const dummyData00 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData01 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData10 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData11 = Array.from({ length: 90 }, () => Math.random() * 100);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <ROMRawDataUnit />
        <ROMRawDataGraph graphType={0} data={dummyData00} />
        <ROMRawDataGraph graphType={1} data={dummyData01} />
      </div>

      <div className="flex flex-col gap-4">
        <ROMRawDataUnit />
        <ROMRawDataGraph graphType={0} data={dummyData10} />
        <ROMRawDataGraph graphType={1} data={dummyData11} />
      </div>
    </div>
  )
};

export default ROMRawDataContainer;