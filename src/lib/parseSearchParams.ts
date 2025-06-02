export const parseSearchParams = (
  searchParams: URLSearchParams
): Record<string, string> => {
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  return query;
};