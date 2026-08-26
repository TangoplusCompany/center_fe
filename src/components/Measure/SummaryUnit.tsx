import { parseString } from "@/utils/parseString";
import { formatDate } from "@/utils/formatDate";
import { useLocale, useTranslations } from "next-intl";
import { getRiskString } from "@/utils/getRiskString";

export interface MeasureSummaryUnitProps {
  ment: string;
  risk_level: string;
  range_level: string;
  title: string;
  measureDate?: string;
}

const MeasureSummaryUnit = ({
  ment,
  risk_level,
  range_level,
  title,
  measureDate,
}: MeasureSummaryUnitProps) => {
  const t= useTranslations("Index");
  const locale = useLocale();
  const getRiskBgClass = (level?: number) =>
  ({
    0: "bg-sub600 dark:bg-gray-600",
    1: "bg-warning",
    2: "bg-danger",
  } as const)[level as 0 | 1 | 2] ?? "bg-primary-foreground";

  // 사용
  const riskString = getRiskString(risk_level, locale);
  const riskBg = getRiskBgClass(parseInt(risk_level));

  return (
    <div >
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-sub800 dark:text-sub100">{title}</h2>
          {measureDate && (
            <span className="text-sm text-sub300 dark:text-gray-400">
              {formatDate(measureDate, locale)}
            </span>
          )}
        </div>
        <span className={`px-3 py-1 ${riskBg} rounded-xl text-sm text-white`}>
          {riskString} {range_level}{t('unit_grade')}
        </span>
      </div>

      <div className="text-base text-sub800 dark:text-sub100 leading-relaxed whitespace-pre-line">
        {parseString(ment).map((el, key) =>
          el === "" ? <br key={key} /> : <p key={key}>{el}</p>
        )}
      </div>
    </div>
  );
};

export default MeasureSummaryUnit;