import { IMeasureROMDetail } from "@/types/measure";
import ROMRawDataContainer from "./RawDataContainer";
import RawDataDynamic, { ROMRawDataDynamicProps } from "./RawDataDynamic";
import { CompareSlot } from "@/types/compare";
import CompareDateCard from "../Compare/CompareDateCard";

export interface ROMBodyProps {
  data0: IMeasureROMDetail
  data1? : IMeasureROMDetail 
  userSn: string
  onCompareDialogOpen: (slot: CompareSlot) => void;
  onROMItemSelect ?: (romSn: number) => void;
}

export const ROMBody = ({
  data0,
  data1,
  userSn,
  onCompareDialogOpen,
  onROMItemSelect,
}: ROMBodyProps) => {
  const leftData : ROMRawDataDynamicProps  = {
    measure_server_file_name : data0.measure_server_file_name,
    measure_server_json_name : data0.measure_server_json_name,
    camera_orientation : data0.camera_orientation,
  }
  // const rightData : ROMRawDataDynamicProps  = {
  //   measure_server_file_name : data1?.measure_server_file_name ?? "",
  //   measure_server_json_name : data1?.measure_server_json_name ?? "",
  //   camera_orientation : data1?.camera_orientation ?? 1,
  // }
  const leftSlot: CompareSlot = 0;  // 또는 1
  const rightSlot: CompareSlot = 1;
  return (
    <div className="flex flex-col gap-4">

      <div className="flex">
        <button
          type="button"
          onClick={() => {
            if (onROMItemSelect) onROMItemSelect(-1); // TODO 이 곳에다가 romItem을 식별할 수 있는 번호를 넣어줘야함
          }}
          className="px-3 py-1 rounded-md text-base text-sub700"
        >
          ← 목록으로
        </button>
      </div>
      

      <div className="grid grid-cols-2 gap-4 items-stretch w-full">
        <div className="min-w-0">
          <CompareDateCard 
            regDate={leftData ? data0.reg_date : ""}
            currentSlot={leftSlot}
            onCardClick={onCompareDialogOpen} />
        </div>
        <div className="min-w-0">
          <CompareDateCard 
            regDate={data1 ? data1.reg_date : ""}
            currentSlot={rightSlot}
            onCardClick={onCompareDialogOpen} />
        </div>
      </div>
      <RawDataDynamic left={leftData} userSn={userSn} onCompareDialogOpen={onCompareDialogOpen} /> 
      <ROMRawDataContainer left={data0} right={data1 ?? undefined} />
    </div>
  )
};

export default ROMBody;