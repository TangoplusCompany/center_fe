import { useState } from "react";
import ROMPartTab from "../Measure/ROM/PartTab";
import ROMBody from "../Measure/ROM/Body";
import { ComparePair, CompareSlot } from "@/types/compare";
import ROMPickerDialog from "../Measure/ROM/PickerDialog";
import { useROMListForCompare } from "@/hooks/api/measure/rom/useROMListForCompare";
import { IMeasureROMDetail, IMeasureROMInfo } from "@/types/measure";
import ROMItemContainer from "../Measure/ROM/ItemContainer";

export interface UserROMProps {
  userSn: string
}
export const CenterUserROMContainer = ({
  userSn
}: UserROMProps) => {
  const [part, setPart] = useState("0");
  
  // TODO 이곳에서 API에서 형식을 어떻게 정하느냐에따라 특정 ROM의 sn을 관리할 것이냐 
  // 아니면 해당 ROM 검사의 unique값? 발 굽힘 검사라고 식별할 수 있는 number? 
  const [romSn, setRomSn] = useState(-1);
  const onPartSelect = (part: string) => {
    setPart(part);
  };
  const onROMItemSelect = (romSn: number) => {
    setRomSn(romSn);
  };


  const [isCompareDialogOpen, setIsCompareDialogOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<CompareSlot>(0);
  const onCompareDialogOpen = (slot: CompareSlot) => {
    setActiveSlot(slot);
    setIsCompareDialogOpen(true);
  };
  // comparePair은 어차피 rom_sn이 있으니 해당 내용을 같이 쓰기.
  const [comparePair, setComparePair] = useState<ComparePair>([null, null]);
  const handleToggleCompareSn = (sn: number, slot: CompareSlot) => {
    setComparePair((prev) => {
      const next: ComparePair = [...prev]; 
      next[slot] = sn;                    
      return next;                         
    });
  };
  // const {
  //   data: leftData,
  //   isLoading: leftLoading,
  //   isError: leftError,
  // } = useMeasureInfo({
  //   measure_sn: leftEnabled ? leftSn : undefined,
  //   user_sn: userSn,
  //   isResultPage,
  // });
  const {
    measureList: compareROMListItems,
    pagination: comparePagination,
  } = useROMListForCompare({
    // userUUID: isResultPage ? undefined : userUUID, // eslint-disable-line @typescript-eslint/no-unused-vars
    user_sn: parseInt(userSn),
    part: parseInt(part)
  });


  // TODO 여기서 선택한 SelectCard에서 선택을 누르면 여기서 받아와서 이제 새 API를 사용해야 함 
  // const {
  //   data: selectedROM0,
  //   isLoading: loading0,
  //   isError: error0
  // } = useGetROMDetail({
  //   user_sn: parseInt(userSn),
  //   rom_sn: comparePair[0]
  // })
  // if (comparePair[1] != null) {
  //   const {
  //     data: selectedROM1,
  //     isLoading: loading1,
  //     isError: error1
  //   } = useGetROMDetail({
  //     user_sn: parseInt(userSn),
  //     rom_sn: comparePair[1]
  //   })
  // }
  const dummayLeft : IMeasureROMDetail = {
    title: "더미 타이틀1",
    reg_date: "",
    measure_server_file_name: "",
    measure_server_json_name: "",
    measure_server_mat_json_name: "",
    description: "설명",
    normal_bad: "0",
    normal_normal: "1",
    max_value: "1",
    value_1_min: "180.0",
    value_1_max: "10.1",
    value_2_min: "179.1",
    value_2_max: "23.9",
    camera_orientation : 1
  }
  // const dummayRight : IMeasureROMDetail = {
  //   title: "더미 타이틀2",
  //   reg_date: "",
  //   measure_server_file_name: "",
  //   measure_server_json_name: "",
  //   measure_server_mat_json_name: "",
  //   description: "설명",
  //   normal_bad: "0",
  //   normal_normal: "1",
  //   max_value: "1",
  //   value_1_min: "18.0",
  //   value_1_max: "100.1",
  //   value_2_min: "19.1",
  //   value_2_max: "273.9",
  //   camera_orientation : 1
  // }
  const dummyROMItems : IMeasureROMInfo[] = [
    {
      title: "[좌측면] 발바닥 굽힘 검사",
      howto: "왼쪽 발끝을 아래쪽으로 누르는 동작종아리 및 아킬레스 유연성 확인, 보행기능 평가, 족저근막염 기능 확인, 수술/재활 경과 확인"
    },
    {
      title: "[우측면] 발바닥 굽힘 검사",
      howto: "아킬레스 유연성 확인, 왼쪽 발끝을 아래쪽으로 누르는 동작종아리 및 보행기능 평가, 족저근막염 기능 확인, 수술/재활 경과 확인"
    },
    {
      title: "[좌측면] 발등 굽힘 검사",
      howto: "보행기능 평가, 족저근막염 기능 확인, 수술/재활 경과 확인 왼쪽 발끝을 아래쪽으로 누르는 동작종아리 및 아킬레스 유연성 확인, "
    },
    {
      title: "[우측면] 발등 굽힘 검사",
      howto: "보행기능 평가, 왼쪽 발끝을 아래쪽으로 누르는 동작종아리 및 아킬레스 유연성 확인, 족저근막염 기능 확인, 수술/재활 경과 확인"
    },
    {
      title: "[좌측면] 발가락 검사",
      howto: "수술/재활 경과 확인 왼쪽 발끝을 아래쪽으로 누르는 동작종아리 및 아킬레스 유연성 확인, 보행기능 평가, 족저근막염 기능 확인, "
    }
  ]
  return (
    <div className="flex flex-col gap-4">
      <ROMPartTab onPartSelect={onPartSelect} onROMItemSelect={onROMItemSelect} romSn={romSn}/>
      {(romSn === -1) && (
        <ROMItemContainer datas={dummyROMItems.slice(0, Math.floor(Math.random() * 4) + 1)} onCompareDialogOpen={onCompareDialogOpen} onROMItemSelect={onROMItemSelect} />
      )}


      {/* <ROMBody data0={dummayLeft} data1={dummayRight} userSn={userSn} onCompareDialogOpen={onCompareDialogOpen}/> */}
      {(romSn !== -1) && (
        <ROMBody data0={dummayLeft} data1={undefined} userSn={userSn} onCompareDialogOpen={onCompareDialogOpen} onROMItemSelect={onROMItemSelect}/>
      )}

      <ROMPickerDialog
        open={isCompareDialogOpen}
        items={compareROMListItems} 
        comparePair={comparePair}
        activeSlot={ activeSlot }
        onOpenChange={setIsCompareDialogOpen}
        onToggleCompareSn={(sn, slot) => {
          // 선택하면 compareMeasureSns에 추가하고 닫기
          handleToggleCompareSn(sn, slot);
          setIsCompareDialogOpen(false);
        }}
        pagination={comparePagination}
      />
    </div>
  )
};

export default CenterUserROMContainer;