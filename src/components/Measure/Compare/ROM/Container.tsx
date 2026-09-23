import { IMeasureROMItemDetail } from "@/types/measure"
import CompareROMItemCard from "./ItemCard";
import { useState } from "react";
import CompareROMDetailBody from "./DetailBody";



export const CompareROMContainer = ({
  datas,
  setRomMeasureType,
}: {
  datas: IMeasureROMItemDetail[];
  romMeasureType: number | undefined;
  setRomMeasureType: (mt: number) => void;
}) => {
  const [selectedRomSn, setSelectedRomSn] = useState<number>();
  

  const onROMItemSelect = (selectRomSn: number, romMeasureType: number) => {
    setSelectedRomSn(selectRomSn);
    setRomMeasureType(romMeasureType)
  };

  // 선택된 아이템 탐색 (return 명시 또는 중괄호 생략)
  const selectedData = datas.find((item) => item.sn === selectedRomSn);

  return (
    <div className="flex flex-col gap-2">
      {selectedRomSn === undefined ? (
        datas.map((data, idx) => (
          <CompareROMItemCard
            key={idx}
            data={data}
            setRomMeasureType={onROMItemSelect}
          />
        ))
      ) : (
        selectedData ? (<CompareROMDetailBody data={selectedData} setSelectedRomSn={setSelectedRomSn} setMeasureType={setRomMeasureType} />) : (<div>올바르지 않은 sn 입니다.</div>)
      )}
    </div>
  );
};