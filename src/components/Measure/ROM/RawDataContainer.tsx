import { IMeasureROMDetail } from "@/types/measure";
import ROMRawDataGraph from "./RawDataGraph";
import ROMRawDataUnit from "./RawDataUnit";

export const ROMRawDataContainer = ({
  // left,
  right
} : {
  left: IMeasureROMDetail;
  right?: IMeasureROMDetail
}) => {
  const dummyData00 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData01 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData10 = Array.from({ length: 90 }, () => Math.random() * 100);
  const dummyData11 = Array.from({ length: 90 }, () => Math.random() * 100);

  const rangeComponent = (
    <div className="grid grid-cols-4 w-full h-full rounded-xl bg-sub100 items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>매우 우수</span>
        <span>170º이상</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>정상</span>
        <span>150º~170º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>주의</span>
        <span>120º~150º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>위험</span>
        <span>120º미만</span>
      </div>
    </div>
  )


  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <ROMRawDataUnit />
        <div className="flex flex-col py-2 rounded-xl bg-sub100 w-full h-full">
          {rangeComponent}
          <div className="p-2 flex flex-col gap-2">
            <ROMRawDataGraph graphType={0} data={dummyData00} />
            <ROMRawDataGraph graphType={1} data={dummyData01} />    
          </div>
        </div>
      </div>

      {right && (
        <div className="flex flex-col gap-4">
        <ROMRawDataUnit />
        <div className="flex flex-col py-2 rounded-xl bg-sub100 w-full h-full">
          {rangeComponent}
           <div className="p-2 flex flex-col gap-2">
            <ROMRawDataGraph graphType={0} data={dummyData10} />
            <ROMRawDataGraph graphType={1} data={dummyData11} />    
          </div>
        </div>
      </div>
      )}
    </div>
  )
};

export default ROMRawDataContainer;