import ResultPageLoginForm from "./_components/ResultPageLoginForm";
import ResultPageProductInfoFooter from "@/components/ResultPage/ResultPageProductInfoFooter";

export default function ResultPageLogin() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-xs md:max-w-sm">
          <ResultPageLoginForm />
        </div>
      </div>
      {/* GS 인증: 제품명·제품 버전·세부 버전을 로그인 화면에서 확인할 수 있게 한다. */}
      <ResultPageProductInfoFooter />
    </div>
  );
}
