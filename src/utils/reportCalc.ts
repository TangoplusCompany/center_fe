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
