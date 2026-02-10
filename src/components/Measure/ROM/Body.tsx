import { IMeasureROMDetail } from "@/types/measure";
import ROMRawDataContainer from "./RawDataContainer";
import RawDataDynamic, { ROMRawDataDynamicProps } from "./RawDataDynamic";
import { CompareSlot } from "@/types/compare";

export interface ROMBodyProps {
  data0: IMeasureROMDetail
  data1? : IMeasureROMDetail 
  userSn: string
  onCompareDialogOpen: (slot: CompareSlot) => void;
}

export const ROMBody = ({
  data0,
  data1,
  userSn,
  onCompareDialogOpen,
}: ROMBodyProps) => {
  const leftData : ROMRawDataDynamicProps  = {
    measure_server_file_name : data0.measure_server_file_name,
    measure_server_json_name : data0.measure_server_json_name,
    camera_orientation : data0.camera_orientation,
  }
  const rightData : ROMRawDataDynamicProps  = {
    measure_server_file_name : data1?.measure_server_file_name ?? "",
    measure_server_json_name : data1?.measure_server_json_name ?? "",
    camera_orientation : data1?.camera_orientation ?? 1,
  }

  return (
    <div className="flex flex-col gap-4">
      <RawDataDynamic left={leftData} right={rightData} userSn={userSn} onCompareDialogOpen={onCompareDialogOpen} /> 
      <ROMRawDataContainer left={data0} right={data1} />
    </div>
  )
};

export default ROMBody;