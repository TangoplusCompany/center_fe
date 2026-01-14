export const getRawDataMark = (measure_unit: string | undefined) => {
  if (measure_unit === undefined) return "";
  return measure_unit?.includes("족압") 
      ? "%" 
      : measure_unit?.includes("거리") 
        ? "cm" 
        : "°";
}
      