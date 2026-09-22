"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useUserLogin } from "@/hooks/api/ResultUser/useUserLogin";
import { useTranslations } from "next-intl";
// import { Check, Globe } from "lucide-react";

const resultPageLoginSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "휴대폰 번호를 입력해주세요." })
    .regex(/^\d{11}$/, "휴대폰 번호 11자리를 입력해주세요."),
  pin: z
    .string()
    .min(1, { message: "PIN 번호를 입력해주세요." })
    .regex(/^\d{4}$/, "PIN 번호 4자리를 입력해주세요."),
});

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default function ResultPageLoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const t = useTranslations("Index")
  // const currentLocale = useLocale();
  // const [isLangOpen, setIsLangOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(resultPageLoginSchema),
  });

  const { mutate: login, isPending } = useUserLogin(setError);
  
  const loginHandleSubmit = handleSubmit((data) => {
    login({
      mobile: data.phone,
      pin_password: data.pin,
      t : t
    });
  });
  // const handleLanguageChange = (newLocale: string) => {
  //   setIsLangOpen(false);
  //   if (newLocale === currentLocale) return;
  //   document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
  //   window.location.reload();
  // };

  // GS 인증: 브라우저별 기본 문구 대신 제품에 정의된 네 가지 입력 오류 문구를 표시한다.
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={loginHandleSubmit}
      noValidate
    >
      {/* 🌐 우측 상단 다국어 선택 드롭다운 */}
        <div className="flex justify-end relative">
          {/* <button
            type="button"
            onClick={() => setIsLangOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-sub100 dark:hover:bg-sub800 transition-colors"
          >
            <Globe className="w-4 h-4 text-sub500" />
            <span>{currentLocale === "ko" ? "한국어" : "English"}</span>
          </button> */}

          {/* {isLangOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-white dark:bg-sub900 border border-sub200 dark:border-sub700 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("ko")}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sub100 dark:hover:bg-sub800 transition-colors ${
                    currentLocale === "ko"
                      ? "font-semibold text-mainBlue-600 dark:text-mainBlue-400"
                      : "text-sub700 dark:text-sub200"
                  }`}
                >
                  <span>한국어</span>
                  {currentLocale === "ko" && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-sub100 dark:hover:bg-sub800 transition-colors ${
                    currentLocale === "en"
                      ? "font-semibold text-mainBlue-600 dark:text-mainBlue-400"
                      : "text-sub700 dark:text-sub200"
                  }`}
                >
                  <span>English</span>
                  {currentLocale === "en" && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </>
          )} */}
        </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('result_page_title')}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t('result_page_subtitle')}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="phone">{t('result_page_mobile')}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t('result_page_mobile_hint')}
            maxLength={11}
            inputMode="numeric"
            autoComplete="off"
            {...register("phone")}
            className="bg-white dark:bg-border"
          />
          {errors.phone?.message && (
            <ErrorText>{String(errors.phone?.message)}</ErrorText>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="pin">{t('result_page_pin')}</Label>
          <Input
            id="pin"
            type="password"
            placeholder={t('result_page_pin_hint')}
            maxLength={4}
            inputMode="numeric"
            autoComplete="off"
            className="bg-white dark:bg-border"
            {...register("pin")}
          />
          {errors.pin?.message && (
            <ErrorText>{String(errors.pin?.message)}</ErrorText>
          )}
        </div>
        <Button 
          variant="outline" 
          type="submit" 
          className="w-full"
          disabled={isPending}
        >
          {isPending ? t('confirm_pending') : t('login')}
        </Button>
      </div>
    </form>
  );
}
