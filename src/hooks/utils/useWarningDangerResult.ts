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
