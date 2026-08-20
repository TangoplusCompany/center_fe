export const getRiskString = (level?: number | string, locale: string = "ko") => {
  if (level === undefined || level === null) return undefined;

  const numLevel = Number(level);
  const isKo = locale.startsWith("ko");

  if (numLevel >= 2) return isKo ? "위험" : "Danger";
  if (numLevel >= 1) return isKo ? "주의" : "Warning";
  return isKo ? "정상" : "Normal";
};