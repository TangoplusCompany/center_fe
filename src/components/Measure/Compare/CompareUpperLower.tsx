import { formatComment } from "@/utils/formatComment";
import { UpperLowerProps } from "../MeasureIntroLower";


const CompareUpperLower = (
{ 
    upper,
    lower
}:
{
  upper: UpperLowerProps;
  lower: UpperLowerProps;
}) => {
  const formattedUpperComment = formatComment(upper.comment);
  const formattedLowerComment = formatComment(lower.comment);
  // const borderCondition0 = {
  //     정상: "border-sub300/50",
  //     주의: "border-warning/50",
  //     위험: "border-danger/50",
  //   }[upper.condition] ?? "bg-primary-foreground";
  // const bgCondition0 = {
  //   정상: "border-sub300/50",
  //   주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
  //   위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  // }[upper.condition] ?? "bg-primary-foreground";
  const textCondition0 = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[upper.condition] ?? "bg-primary-foreground";
  const textBgCondition0 = {
    정상: "bg-sub300",
    주의: "bg-warning",
    위험: "bg-danger",
  }[upper.condition] ?? "bg-primary-foreground";

  // const borderCondition1 = {
  //     정상: "border-sub300/50",
  //     주의: "border-warning/50",
  //     위험: "border-danger/50",
  //   }[lower.condition] ?? "bg-primary-foreground";
  // const bgCondition1 = {
  //   정상: "border-sub300/50",
  //   주의: "bg-gradient-to-b from-[#FFA73A]/10 from-[2%] to-white to-[40%]",
  //   위험: "bg-gradient-to-b from-[#FF5252]/10 from-[2%] to-white to-[50%]",
  // }[lower.condition] ?? "bg-primary-foreground";
  const textCondition1 = {
    정상: "text-secondary",
    주의: "text-warningDeep",
    위험: "text-dangerDeep",
  }[lower.condition] ?? "bg-primary-foreground";
  const textBgCondition1 = {
    정상: "bg-sub300",
    주의: "bg-warning",
    위험: "bg-danger",
  }[lower.condition] ?? "bg-primary-foreground";

  return (
    // ${borderCondition0} ${bgCondition0}
    <div 
      className={`grid grid-cols-2 h-full p-4 rounded-3xl gap-4`}>
      <div>
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${textCondition0}`}>하지 결과</h2>
          <span className={`px-3 py-1 ${textBgCondition0} rounded-xl text-sm text-white`}>
            {upper.condition} {upper.level}단계
          </span>
        </div>
        {/* 코멘트 */}
        <div className="text-base text-sub800 whitespace-pre-line mb-4">
          {formattedUpperComment}
        </div>
      </div>

      <div>
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${textCondition1}`}>하지 결과</h2>
          <span className={`px-3 py-1 ${textBgCondition1} rounded-xl text-sm text-white`}>
            {lower.condition} {lower.level}단계
          </span>
        </div>
        {/* 코멘트 */}
        <div className="text-base text-sub800 whitespace-pre-line mb-4">
          {formattedLowerComment}
        </div>
      </div>
    </div>
  );
};

export default CompareUpperLower;