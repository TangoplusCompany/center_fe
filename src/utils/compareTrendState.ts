export const compareTrendState = (score0: number, score1: number | undefined, t : (key: string) => string) => {
  if (score1 === undefined) return "";
  const diff = score1 - score0;
  if (diff > 0) return `${diff}${t('unit_grade')} ${t('compare_better')}`;
  if (diff < 0) return `${Math.abs(diff)}${t('unit_grade')} ${t('compare_worse')}`;
  return t('compare_none');
};