export const getRiskScore = (riskLevel: string, rangeLevel: string) => {
  if (!riskLevel) return 0;
  return (parseInt(riskLevel) * 3) + parseInt(rangeLevel);
}