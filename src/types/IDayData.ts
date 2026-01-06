export interface IDayData {
  date: string;
  riskValues: number[];  // 기존 values를 riskValues로 변경
  rangeValues: number[]; // range_level 값들 추가
}