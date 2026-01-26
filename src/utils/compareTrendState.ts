export const compareTrendState = (score0: number, score1: number | undefined) => {
  if (score1 === undefined) return "";
  const diff = score1 - score0;
  if (diff > 0) return `${diff}단계 완화`;
  if (diff < 0) return `${Math.abs(diff)}단계 악화`;
  return "변화 없음";
};