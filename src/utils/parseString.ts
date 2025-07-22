/**
 * 문자열을 줄바꿈 기준으로 분리
 * @param str 문자열
 * @returns 분리된 문자열 배열
 */
export const parseString = (str: string) => {
  return str.split("\r\n");
};
