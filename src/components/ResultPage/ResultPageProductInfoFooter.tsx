import { useTranslations } from "next-intl";

// GS 인증: 결과 제품의 제품명과 버전을 로그인 화면에 한 줄로 제공한다.
const ResultPageProductInfoFooter = () => {
  const t = useTranslations("Index");
  return (
    <footer className="shrink-0 px-4 py-3 text-center">
      <p className="text-sm text-muted-foreground">
        {t("service_info_user")}
      </p>
    </footer>
  );
};

export default ResultPageProductInfoFooter;
