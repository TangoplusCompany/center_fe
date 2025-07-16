/**
 * 데이터를 기준점과 비교하여 위험도 계산
 * @param data 데이터
 * @param defaultPoint 표준 기준점
 * @param warningPoint 주의 범위
 * @param dangerPoint 이상 범위
 * @returns 위험도
 */
export const calcFigureRiskLevel = (
  data: number,
  defaultPoint: number,
  warningPoint: number,
  dangerPoint: number,
) => {
  if (
    data > defaultPoint - warningPoint &&
    data < defaultPoint + warningPoint
  ) {
    return 0;
  }
  if (data > defaultPoint - dangerPoint || data < defaultPoint + dangerPoint) {
    return 2;
  }
  return 1;
};
