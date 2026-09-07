/** ROM 최대 각도 표시: 180 - |value_1_min| */
export const getRomDisplayMaxAngle = (value1Min?: number | null) => {
  const min = Number(value1Min);
  if (!Number.isFinite(min)) return null;
  return 180 - Math.abs(min);
};

/** ROM 최소 각도 표시: 180 - |value_1_max| */
export const getRomDisplayMinAngle = (value1Max?: number | null) => {
  const max = Number(value1Max);
  if (!Number.isFinite(max)) return null;
  return 180 - Math.abs(max);
};
