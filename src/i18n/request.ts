import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // 유효하지 않은 locale 기본값 처리
  if (!locale || !['ko', 'en'].includes(locale)) {
    locale = 'ko';
  }

  return {
    locale,
    // messages 폴더가 프로젝트 루트에 있는 경우:
    messages: (await import(`../../messages/${locale}.json`)).default,
    // 만약 messages 폴더가 src 안에 있다면 아래 경로 사용:
    // messages: (await import(`../messages/${locale}.json`)).default,
  };
});