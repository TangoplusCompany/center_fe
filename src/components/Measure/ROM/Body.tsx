import ROMRawDataContainer from "./RawDataContainer";
import RawDataDynamic, { ROMRawDataDynamicProps } from "./RawDataDynamic";
import { ComparePair, CompareSlot } from "@/types/compare";
import CompareDateCard from "../Compare/CompareDateCard";
import { IMeasureROMItemDetail } from "@/types/measure";
import CompareBodySkeleton from "../Compare/CompareBodySkeleton";

export interface ROMBodyProps {
  data0: IMeasureROMItemDetail
  data1? : IMeasureROMItemDetail 
  onCompareDialogOpen: (slot: CompareSlot, measureType?: number) => void;
  onROMItemSelect ?: (romSn: ComparePair) => void;
  isLoading0 : boolean;
  isError0 : boolean;
  isLoading1: boolean;
  isError1: boolean;
}

export const ROMBody = ({
  data0,
  data1,
  onCompareDialogOpen,
  // onROMItemSelect,
  isLoading0,
  isError0,
  isLoading1,
  isError1,
}: ROMBodyProps) => {
  
  const leftData : ROMRawDataDynamicProps  = {
    measure_server_file_name : data0.measure_server_file_name,
    measure_server_json_name : data0.measure_server_json_name,
    camera_orientation : data0.camera_orientation,
  }
  const rightData = data1 ? {
    measure_server_file_name: data1.measure_server_file_name,
    measure_server_json_name: data1.measure_server_json_name,
    camera_orientation: data1.camera_orientation,
  } as ROMRawDataDynamicProps : undefined;


  const leftSlot: CompareSlot = 0;  // 또는 1
  const rightSlot: CompareSlot = 1;

  if (isLoading0 || isLoading1) {
    return <CompareBodySkeleton />;
  }

  if (isError0 || isError1) {
    return <div>데이터 로딩 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* <div className="flex">
        <button
          type="button"
          onClick={() => {
            if (onROMItemSelect) {
              onROMItemSelect(undefined, true)
              onROMItemSelect(undefined, false) 
            };
          }}
          className="px-3 py-1 rounded-md text-base text-sub700"
        >
          ← 목록으로
        </button>
      </div> */}
      

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
      <RawDataDynamic left={leftData} right={rightData} onCompareDialogOpen={onCompareDialogOpen} /> 
      <ROMRawDataContainer left={data0} right={data1 ?? undefined} fileName0={data0.measure_server_data_json_name} fileName1={data1?.measure_server_data_json_name ?? undefined} />
    </div>
  )
};

export default ROMBody;