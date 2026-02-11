/**
 * 한국 휴대폰·지역번호 형식 검사 (숫자만, 9~11자리)
 * @param digits 숫자만 포함한 문자열 (띄어쓰기·하이픈 제거된 값)
 * @returns 유효하면 true
 */
export function isValidKoreanPhone(digits: string): boolean {
  if (!digits || typeof digits !== "string") return false;
  const d = digits.replace(/\D/g, "");
  if (d.length < 9 || d.length > 11) return false;
  // 휴대폰: 010(10~11자리), 011/016/017/018/019(10자리)
  if (d.startsWith("010")) return d.length === 10 || d.length === 11;
  if (/^01[16789]/.test(d)) return d.length === 10;
  // 지역번호: 02(9~10자리), 031~064 등(10~11자리)
  if (d.startsWith("02")) return d.length === 9 || d.length === 10;
  if (/^0(3[1-3]|4[1-4]|5[1-5]|6[1-4])/.test(d)) return d.length >= 10 && d.length <= 11;
  return false;
}

export const KOREAN_PHONE_ERROR_MESSAGE =
  "전화번호는 지역번호(02, 031~064 등) 또는 휴대폰(010, 011 등) 형식이어야 합니다.";
