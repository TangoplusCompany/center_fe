/**
 * 전화번호에 하이픈 추가 (핸드폰·유선 공통)
 * @param phone 전화번호 (숫자 또는 하이픈 포함)
 * @returns 하이픈이 적용된 전화번호
 * - 핸드폰: 010-XXXX-XXXX, 010-XXX-XXXX
 * - 유선(서울): 02-XXX-XXXX, 02-XXXX-XXXX
 * - 유선(지방): 031-XXX-XXXX, 051-XXX-XXXX 등
 */
export const phoneHyphen = (phone: string) => {
  const cleaned = phone.replaceAll("-", "").replace(/\D/g, "");
  if (!cleaned) return phone;

  // 핸드폰: 010으로 시작 (10자리: 010-XXX-XXXX, 11자리: 010-XXXX-XXXX)
  if (cleaned.startsWith("010")) {
    if (cleaned.length === 11) return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    if (cleaned.length === 10) return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // 유선(서울): 02로 시작 (9자리: 02-XXX-XXXX, 10자리: 02-XXXX-XXXX)
  if (cleaned.startsWith("02")) {
    if (cleaned.length === 9) return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    if (cleaned.length === 10) return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 유선(지방): 031, 032, 051 등 0XX (10자리: 0XX-XXX-XXXX)
  if (cleaned.length === 10 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  // 기본: 11자리 (3-4-4) 또는 10자리 (3-3-4)
  if (cleaned.length === 11) return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  if (cleaned.length === 10) return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

  return phone;
};

/**
 * 전화번호 가운데 부분 마스킹
 * @param phone 전화번호
 * @returns 마스킹된 전화번호 (010-41**-**73)
 */
export const phoneFiltering = (phone: string) => {
  // 하이픈 제거 후 마스킹
  const cleaned = phone.replaceAll("-", "");
  // 010-1234-5678 또는 01012345678 -> 010****5678
  return cleaned.replace(/(\d{3})(\d{2})\d{2}(\d{2})(\d{2})/, '$1-$2**-**$4');
};

/**
 * 이름 필터링
 * @param name 이름
 * @returns 필터링된 이름
 */
export const nameFiltering = (name: string) => {
  if (name.length <= 2) {
    return name[0] + "*";
  }
  if (name.length > 7) {
    return name.replace(/^(.{3})(.*)(.{3})$/, (_, first, middle, last) => {
      return first + "*".repeat(middle.length) + last;
    });
  }
  return name.replace(/^(.)(.*)(.)$/, (_, first, middle, last) => {
    return first + "*".repeat(middle.length) + last;
  });
};

/**
 * 이메일 필터링
 * @param email 이메일
 * @returns 필터링된 이메일
 */
export const emailFiltering = (email: string) => {
  return email.replace(/^(.{4})([^@]*)(@.*)$/, (_, first, hidden, domain) => {
    return first + "*".repeat(hidden.length) + domain;
  });
};
