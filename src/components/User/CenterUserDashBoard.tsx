
import MeasureWorst from "@/components/Measure/MeasureWorst";
import MeasureBest from "@/components/Measure/MeasureBest";
import MeasureGraph from "@/components/Measure/MeasureGraph";
import MeasureSummary from "@/components/Measure/MeasureSummary";
import { IUserDashBoard, MeasureHistory } from "@/types/measure";
import { IDayData } from "@/types/IDayData";
import { useGetUserDashboard } from "@/hooks/api/user/useGetUserDashboard";
import { TWorstPart } from "@/types/dashboard";

type Mode = "worst" | "best";
const PARTS = [
  { key: "neck", label: "목" },
  { key: "shoulder", label: "어깨" },
  { key: "elbow", label: "팔꿈치" },
  { key: "hip", label: "엉덩이" },
  { key: "knee", label: "무릎" },
  { key: "ankle", label: "발목" },
] as const;
const RISK_PART_KEYS = [
  "neck",
  "shoulder",
  "elbow",
  "hip",
  "knee",
  "ankle",
] as const;

const CenterUserDashBoard = ({
  userSn
}: {
  userSn?: number;
}) => {
  const {
    data: dashboardData,
    isLoading: dashboardDataLoading,
    isError: dashboardDataError,
  } = useGetUserDashboard<IUserDashBoard>(
    userSn
      ? Number(userSn)
      : undefined
  );

  if (dashboardDataLoading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-gray-500">대시보드 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (dashboardDataError) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-red-500">대시보드 데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }
  
  // 탭 0에서 쓸 더미/요약용 데이터 (기존 코드 유지)
  const worstPart = calculateExtremePart(dashboardData ? dashboardData?.measure_history : [], "worst");
  const bestPart = calculateExtremePart(dashboardData ? dashboardData?.measure_history : [], "best");

  const measureDate = calculateIDayData(dashboardData ? dashboardData?.measure_history : []);
  console.log(measureDate);
  return (
    
    <div className="flex w-full gap-4">
      {/* 왼쪽 */}
      <div className="flex flex-col flex-[2] gap-4">
        {/* Worst + Best */}
        <div className="flex gap-4">
          <div className="flex-1">
            <MeasureWorst data={worstPart} />
          </div>
          <div className="flex-1">
            <MeasureBest data={bestPart} />
          </div>
        </div>

        <div className="flex-[1]">
          {dashboardData ? (
            <MeasureSummary data={dashboardData?.latest_measure_summary} count={dashboardData?.total_measure_count} />
          ) : (
            <p className="text-gray-500">요약 데이터를 불러오는 중이거나 없습니다.</p>
          )}
        </div>
        <div>
          <MeasureGraph data={measureDate} />
        </div>
      </div>
    </div>
  )
};


export default CenterUserDashBoard;




export function calculateExtremePart(
  history: MeasureHistory[],
  mode: Mode
): TWorstPart {
  const maxCount = history.length;

  const levelPriority =
    mode === "worst" ? [2, 1, 0] : [0, 1, 2];

  let result: {
    partName: string;
    level: number;
    count: number;
  } | null = null;

  for (const level of levelPriority) {
    for (const part of PARTS) {
      const count = history.filter(
        (item) =>
          Number(item[`risk_level_${part.key}`]) === level
      ).length;

      if (
        !result ||
        count > result.count ||
        (count === result.count && levelPriority.indexOf(level) < levelPriority.indexOf(result.level))
      ) {
        result = {
          partName: part.label,
          level,
          count,
        };
      }
    }

    if (result && result.level === level && result.count > 0) {
      break;
    }
  }

  if (!result) {
  return {
    partName: "-",
    level: 0,
    description: "측정 데이터가 없어 판단할 수 없습니다.",
  };
}

  const levelText =
    result.level === 2
      ? "위험"
      : result.level === 1
      ? "주의"
      : "정상";

  return {
    partName: result.partName,
    level: result.level,
    description: `최근 ${maxCount}회 측정에서 ${result.partName} 부위의 ${levelText} 판단이 ${result.count}회 발생했습니다.`,
  };
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
    date.getDate()
  ).padStart(2, "0")}`;
}
export function calculateIDayData(
  history: MeasureHistory[]
): IDayData[] {
  return history.map((item) => {
    const values = RISK_PART_KEYS.map((key) =>
      Number(item[`risk_level_${key}`] ?? 0)
    );

    return {
      date: formatDate(item.measure_date),
      values,
    };
  });
}