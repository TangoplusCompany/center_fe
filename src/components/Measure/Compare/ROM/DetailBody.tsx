import { IMeasureROMItemDetail } from "@/types/measure";
import { useTranslations } from "next-intl";
import { ROMRawDataDynamicProps } from "../../Rom/RawDataDynamic";
import { CompareRomRawDataContainer } from "./RawDataContainer";
import CompareROMRawDataDynamic from "./RawDataDynamic";

export default function CompareROMDetailBody ({
  data,
  setSelectedRomSn,
  setMeasureType,
}: {
  data: IMeasureROMItemDetail;
  setSelectedRomSn: (sn: number | undefined) => void;
  setMeasureType: (mt: number) => void;
}) {
  const t = useTranslations("Index");
  const fileData = data ? {
    measure_server_file_name: data.measure_server_file_name,
    measure_server_json_name: data.measure_server_json_name,
    camera_orientation: data.camera_orientation,
    measure_type: data.measure_type
  } as ROMRawDataDynamicProps : undefined;


  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            setSelectedRomSn(undefined)
          }}
          className="px-3 py-1 rounded-md text-sm text-sub400 hover:text-sub600 transition-colors"
        >
          ← {t('go_rom_list')}
        </button>
      </div>

      <CompareROMRawDataDynamic data={fileData}  /> 
      <CompareRomRawDataContainer 
        data={data}
        setMeasureType={setMeasureType} />
    </div>
  )
}