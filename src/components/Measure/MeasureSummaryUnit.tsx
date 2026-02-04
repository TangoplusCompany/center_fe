import { parseString } from "@/utils/parseString";
import { formatDate } from "@/utils/formatDate";

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
  const getRiskString = (level?: string) => 
  ({
    "0": "정상",
    "1": "주의",
    "2": "위험"
  } as const)[level ?? "0"] ?? "정상";
  const getRiskBgClass = (level?: string) =>
  ({
    정상: "bg-sub600 dark:bg-gray-600",
    주의: "bg-warning",
    위험: "bg-danger",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";

  // 사용
  const riskString = getRiskString(risk_level);
  const riskBg = getRiskBgClass(riskString);

  return (
    <div >
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-foreground dark:text-foreground">{title}</h2>
          {measureDate && (
            <span className="text-sm text-sub300 dark:text-gray-400">
              {formatDate(measureDate)}
            </span>
          )}
        </div>
        <span className={`px-3 py-1 ${riskBg} rounded-xl text-sm text-white`}>
          {riskString} {range_level}단계
        </span>
      </div>

      <div className="text-base text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
        {parseString(ment).map((el, key) =>
          el === "" ? <br key={key} /> : <p key={key}>{el}</p>
        )}
      </div>
    </div>
  );
};

export default MeasureSummaryUnit;