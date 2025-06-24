/**
 * 경고 및 위험 결과 계산 훅
 * @param defaultAvg 기본 평균값
 * @param sdAvg 표준 편차값
 * @returns 경고 및 위험 결과 계산 결과
 */
export const useWarningDangerResult = ({
  defaultAvg,
  sdAvg,
}: {
  defaultAvg: number;
  sdAvg: number;
}) => {
  const warningMin = defaultAvg - Number((sdAvg * 0.191).toFixed(4));
  const dangerMin = defaultAvg - Number((sdAvg * 0.433).toFixed(4));
  const warningMax = defaultAvg + Number((sdAvg * 0.191).toFixed(4));
  const dangerMax = defaultAvg + Number((sdAvg * 0.433).toFixed(4));
  return { warningMin, dangerMin, warningMax, dangerMax };
};
