import { IMeasureROMItemDetail } from "@/types/measure";
import ROMRawDataGraph from "./RawDataGraph";
import ROMRawDataUnit from "./RawDataUnit";
import { useGetMeasureROMGraphJson } from "@/hooks/api/measure/rom/useGetMeasureROMGraphJson";
import { Skeleton } from "@/components/ui/skeleton";
import { CompareSlot } from "@/types/compare";
import { useTranslations } from "next-intl";

interface ROMRawDataContainerProps {
  left?: IMeasureROMItemDetail;
  right?: IMeasureROMItemDetail;
  onCompareDialogOpen: (slot: CompareSlot, selectedMeasureType?: number) => void;
}

export const ROMRawDataContainer = ({
  left,
  right,
  onCompareDialogOpen,
} : ROMRawDataContainerProps) => {
  const t = useTranslations("Index");
  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useGetMeasureROMGraphJson(
    left?.measure_server_data_json_name
  );
  const { data: measureJson1, isLoading: jsonLoading1, isError: jsonError1 } = useGetMeasureROMGraphJson(
    right?.measure_server_data_json_name
  );

  const rangeComponent0 = (
    <div className="grid grid-cols-4 w-full h-full rounded-xl bg-sub100 items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_very_good')}</span>
        <span>{left?.normal_normal}º {t('data_more')}</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_normal')}</span>
        <span>{left?.normal_warning}º~{left?.normal_normal}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_caution')}</span>
        <span>{left?.normal_bad}º~{left?.normal_warning}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_danger')}</span>
        <span>{left?.normal_bad}º{t('data_less')}</span>
      </div>
    </div>
  )
  const rangeComponent1 = right ? (
    <div className="grid grid-cols-4 w-full h-full rounded-xl bg-sub100 items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_very_good')}</span>
        <span>{right?.normal_normal}º {t('data_more')}</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_normal')}</span>
        <span>{right?.normal_warning}º~{right?.normal_normal}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_caution')}</span>
        <span>{right?.normal_bad}º~{right?.normal_warning}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_danger')}</span>
        <span>{right?.normal_bad}º{t('data_less')}</span>
      </div>
    </div>
  ) : undefined
  if (jsonLoading0 && jsonLoading1) return (
    <div className="grid grid-cols-2 gap-4">
      <Skeleton className="w-full h-128" />
      <Skeleton className="w-full h-128" />
    </div>
  )

  if (jsonError0 && jsonError1) return <div>데이터 로딩 중 오류가 발생했습니다.</div>;

  return (
    <div className="grid grid-cols-2 gap-4">
      {left ? (
        <div className="flex flex-col gap-4">
          <ROMRawDataUnit data={left} onCompareDialogOpen={onCompareDialogOpen} compareSlot={1}  />
          <div className="flex flex-col py-2 rounded-xl bg-sub100 w-full h-full">
            {rangeComponent0}
            <div className="p-2 flex flex-col gap-2">
              <ROMRawDataGraph graphType={0} data={measureJson0?.values ?? []} maxMinValue={left} />
              <ROMRawDataGraph graphType={1} data={measureJson0?.values2 ?? []} maxMinValue={left} />    
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      {right && (
        <div className="flex flex-col gap-4">
        <ROMRawDataUnit data={right} onCompareDialogOpen={onCompareDialogOpen} compareSlot={0}/>
        <div className="flex flex-col py-2 rounded-xl bg-sub100 w-full h-full">
          {rangeComponent1}
           <div className="p-2 flex flex-col gap-2">
            <ROMRawDataGraph graphType={0} data={measureJson1?.values ?? []} maxMinValue={right} />
            <ROMRawDataGraph graphType={1} data={measureJson1?.values2 ?? []} maxMinValue={right} />    
          </div>
        </div>
      </div>
      )}
    </div>
  )
};

export default ROMRawDataContainer;