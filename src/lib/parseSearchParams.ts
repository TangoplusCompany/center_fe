/**
 * 쿼리 파라미터 파싱 함수
 * @param searchParams URLSearchParams 객체
 * @returns 쿼리 파라미터 객체
 */
export const parseSearchParams = (
  searchParams: URLSearchParams
): Record<string, string> => {
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return query;
};