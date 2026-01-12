import { parseString } from "@/utils/parseString";

export interface MeasureSummaryUnitProps {
  ment: string;
  risk_level: string;
  range_level: string;
}

const MeasureSummaryUnit = ({
  ment,
  risk_level,
  range_level
}: MeasureSummaryUnitProps) => {
  const getRiskString = (level?: string) => 
  ({
    "0": "정상",
    "1": "주의",
    "2": "위험"
  } as const)[level ?? "0"] ?? "정상";
  const getRiskText = (level?: string) => ({
    정상: "text-sub600",
    주의: "text-white",
    위험: "text-white",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";
  const getRiskBgClass = (level?: string) =>
  ({
    정상: "bg-sub200/50",
    주의: "bg-warning",
    위험: "bg-danger",
  } as const)[level as "정상" | "주의" | "위험"] ?? "bg-primary-foreground";

  // 사용
  const riskString = getRiskString(risk_level);
  const riskBg = getRiskBgClass(riskString);
  const riskText = getRiskText(riskString)

  return (
    <div >
      <div className="flex justify-between items-center py-2">
        <h2 className="text-xl font-semibold">하지 결과</h2>
        <span className={`px-3 py-1 ${riskBg} rounded-xl text-sm ${riskText}`}>
          {riskString} {range_level}단계
        </span>
      </div>

      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        {parseString(ment).map((el, key) =>
          el === "" ? <br key={key} /> : <p key={key}>{el}</p>
        )}
      </div>
    </div>
  );
};

export default MeasureSummaryUnit;