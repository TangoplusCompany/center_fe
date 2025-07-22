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
  const minDanger = defaultPoint - dangerPoint;
  const maxDanger = defaultPoint + dangerPoint;
  if (
    data > defaultPoint - warningPoint &&
    data < defaultPoint + warningPoint
  ) {
    return 0;
  }
  if (data > maxDanger || data < minDanger) {
    return 2;
  }
  return 1;
};

/**
 * 좌/우 값 차이 계산
 * @param left 좌측 값
 * @param right 우측 값
 * @returns 좌/우 값 차이
 */
export const calcGapLeftRight = (
  left: number,
  right: number,
  warningPoint: number,
  dangerPoint: number,
) => {
  const resultData =
    left > right
      ? left - right
      : right - left;
  if (resultData > dangerPoint) {
    return 2;
  }
  if (resultData > warningPoint) {
    return 1;
  }
  return 0;
};
