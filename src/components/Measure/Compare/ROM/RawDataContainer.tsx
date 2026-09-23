import { IMeasureROMItemDetail } from "@/types/measure";
import { useGetMeasureROMGraphJson } from "@/hooks/api/measure/rom/useGetMeasureROMGraphJson";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import ROMRawDataGraph from "../../Rom/RawDataGraph";
import CompareRomRawDataUnit from "./RawDataUnit";

interface CompareROMRawDataContainerProps {
  data?: IMeasureROMItemDetail;
  setMeasureType: (mt: number) => void;
}

export const CompareRomRawDataContainer = ({
  data,

} : CompareROMRawDataContainerProps) => {
  const t = useTranslations("Index");
  const { data: measureJson0, isLoading: jsonLoading0, isError: jsonError0 } = useGetMeasureROMGraphJson(
    data?.measure_server_data_json_name
  );
  
  
  const rangeComponent0 = (
    <div className="grid grid-cols-4 w-full h-full rounded-xl bg-sub100 items-center divide-x-2 divide-sub200">
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_very_good')}</span>
        <span>{data?.normal_normal}º {t('data_more')}</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_normal')}</span>
        <span>{data?.normal_warning}º~{data?.normal_normal}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_caution')}</span>
        <span>{data?.normal_bad}º~{data?.normal_warning}º</span>
      </div>
      <div className="flex flex-col gap-1 w-full items-center py-2 ">
        <span>{t('grade_danger')}</span>
        <span>{data?.normal_bad}º{t('data_less')}</span>
      </div>
    </div>
  )
  
  if (jsonLoading0) return (
    <div className="flex w-full gap-4">
      <Skeleton className="w-full h-128" />
      <Skeleton className="w-full h-128" />
    </div>
  )

  if (jsonError0) return <div>데이터 로딩 중 오류가 발생했습니다.</div>;

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        <div className="flex flex-col gap-4">
          <CompareRomRawDataUnit data={data} />
          <div className="flex flex-col py-2 rounded-xl bg-sub100 w-full h-full">
            {rangeComponent0}
            <div className="p-2 flex flex-col gap-2">
              <ROMRawDataGraph graphType={0} data={measureJson0?.values ?? []} maxMinValue={data} />
              <ROMRawDataGraph graphType={1} data={measureJson0?.values2 ?? []} maxMinValue={data} />    
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

    </div>
  )
};
