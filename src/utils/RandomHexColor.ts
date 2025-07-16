/**
 * 랜덤 16진수 색상 생성
 * @returns 16진수 색상
 */
export function RandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, "0")}`;
}
