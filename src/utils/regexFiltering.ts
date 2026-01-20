/**
 * 전화번호에서 하이픈 제거
 * @param phone 전화번호
 * @returns 하이픈이 제거된 전화번호
 */
export const phoneHyphen = (phone: string) => {
  return phone.replaceAll("-", "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

/**
 * 전화번호에서 하이픈 추가
 * @param phone 전화번호
 * @returns 하이픈이 추가된 전화번호
 */
export const phoneFiltering = (phone: string) => {
  // 010-1234-5678 -> 010-12**-**78
  return phone.replace(/(\d{3})-(\d{2})\d{2}-\d{2}(\d{2})/, '$1-$2**-**$3');
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
