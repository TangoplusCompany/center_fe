"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm, FieldValues, UseFormSetError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronDown, Globe, X } from "lucide-react";
import Link from "next/link";
import { CountryCodeDialog } from "@/components/CountryCodeDialog";
import { Country, getDefaultCountryByLanguage } from "@/data/countries";
import { useUserRegister } from "@/hooks/api/ResultUser/useUserRegister";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const createRegisterSchema = (t: (key: string) => string, countryCode: string) =>
  z
    .object({
      phone: z
        .string()
        .min(1, { message: t("result_page_phone_hint") })
        .refine(
          (val) => {
            const clean = val.replace(/[^0-9]/g, "");
            if (countryCode === "KR") {
              return clean.length >= 10 && clean.length <= 11;
            }
            return clean.length >= 5 && clean.length <= 15;
          },
          {
            message:
              countryCode === "KR"
                ? t("result_page_phone_11")
                : t("result_page_mobile_hint"),
          }
        ),
      email: z
        .string()
        .min(1, { message: t("label_email") })
        .email({ message: t("email_invalid") }),
      pin: z
        .string()
        .min(1, { message: t("result_page_pin_hint") })
        .regex(/^\d{4}$/, { message: t("result_page_pin_4") }),
      pinConfirm: z
        .string()
        .min(1, { message: t("result_page_pin_confirm_hint") })
        .regex(/^\d{4}$/, { message: t("result_page_pin_4") }),
      birthDate: z
        .string()
        .min(1, { message: t("result_page_birth_hint") })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: t("validation_birth_format") }),
      firstName: z
        .string()
        .min(1, { message: t("result_page_first_name_hint") }),
      lastName: z
        .string()
        .min(1, { message: t("result_page_last_name_hint") }),
      gender: z.enum(["남성", "여성"], {
        errorMap: () => ({ message: t("label_gender") }),
      }),
      privacyAccepted: z.literal(true, {
        errorMap: () => ({ message: t("result_page_privacy_agree") }),
      }),
    })
    .refine((data) => data.pin === data.pinConfirm, {
      message: t("result_page_pin_mismatch"),
      path: ["pinConfirm"],
    });

type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-xs text-red-500 mt-0.5">{children}</p>;
};

export default function ResultPageRegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const t = useTranslations("Index");
  const currentLocale = useLocale();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<Country>(() =>
    getDefaultCountryByLanguage(currentLocale)
  );
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const registerSchema = useMemo(
    () => createRegisterSchema(t, selectedCountry.code),
    [t, selectedCountry.code]
  );

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      email: "",
      pin: "",
      pinConfirm: "",
      birthDate: "",
      firstName: "",
      lastName: "",
      privacyAccepted: false as unknown as true,
    },
  });

  const phone = watch("phone");
  const email = watch("email");
  const pin = watch("pin");
  const pinConfirm = watch("pinConfirm");
  const birthDate = watch("birthDate");
  const lastName = watch("lastName");
  const firstName = watch("firstName");
  const currentGender = watch("gender");
  const privacyAccepted = watch("privacyAccepted");

  const isFormValid = useMemo(() => {
    const cleanPhone = (phone || "").replace(/[^0-9]/g, "");
    const isPhoneValid =
      selectedCountry.code === "KR"
        ? cleanPhone.length >= 10 && cleanPhone.length <= 11
        : cleanPhone.length >= 5 && cleanPhone.length <= 15;

    const isEmailValid =
      Boolean(email && email.trim()) &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

    const isPinValid = Boolean(pin && /^\d{4}$/.test(pin));
    const isPinConfirmValid = Boolean(pinConfirm && pin === pinConfirm);
    const isBirthValid = Boolean(
      birthDate && /^\d{4}-\d{2}-\d{2}$/.test(birthDate)
    );
    const isLastNameValid = Boolean(lastName && lastName.trim().length > 0);
    const isFirstNameValid = Boolean(firstName && firstName.trim().length > 0);
    const isGenderValid = currentGender === "남성" || currentGender === "여성";
    const isPrivacyValid = Boolean(privacyAccepted);

    return (
      isPhoneValid &&
      isEmailValid &&
      isPinValid &&
      isPinConfirmValid &&
      isBirthValid &&
      isLastNameValid &&
      isFirstNameValid &&
      isGenderValid &&
      isPrivacyValid
    );
  }, [
    phone,
    selectedCountry.code,
    email,
    pin,
    pinConfirm,
    birthDate,
    lastName,
    firstName,
    currentGender,
    privacyAccepted,
  ]);

  const { mutate: registerUser, isPending } = useUserRegister(
    setError as unknown as UseFormSetError<FieldValues>
  );

  const handleLanguageChange = (newLocale: string) => {
    setIsLangOpen(false);
    if (newLocale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  const handleRegisterSubmit = handleSubmit((data) => {
    registerUser({
      email: data.email,
      pin_password: data.pin,
      birthday: data.birthDate,
      gender: data.gender,
      mobile: data.phone.replace(/[^0-9]/g, ""),
      country_iso: selectedCountry.code,
      first_name: data.firstName?.trim() || "",
      last_name: data.lastName?.trim() || "",
      t,
    });
  });

  return (
    <form
      className={cn("flex flex-col gap-5", className)}
      {...props}
      onSubmit={handleRegisterSubmit}
      noValidate
    >
      {/* 🌐 우측 상단 다국어 선택 드롭다운 */}
      <div className="flex justify-end relative">
        <button
          type="button"
          onClick={() => setIsLangOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-sub100 dark:hover:bg-sub800 transition-colors cursor-pointer"
        >
          <Globe className="w-4 h-4 text-sub500" />
          <span>{currentLocale === "ko" ? "한국어" : "English"}</span>
        </button>

        {isLangOpen && (
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
        )}
      </div>

      {/* 헤더 타이틀 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t("result_page_register_title")}</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t("result_page_register_subtitle")}
        </p>
      </div>

      <div className="grid gap-4">
        {/* 1. (국가 번호) 휴대폰 번호 (필수) */}
        <div className="grid gap-1.5">
          <Label htmlFor="phone">
            {t("result_page_mobile")} <span className="text-red-500 font-bold">*</span>
          </Label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsCountryModalOpen(true)}
              disabled={isPending}
              className="flex items-center justify-between gap-1.5 px-3 h-9 rounded-md border border-input bg-white dark:bg-border text-xs sm:text-sm hover:bg-sub100 dark:hover:bg-sub800 transition-colors shrink-0 cursor-pointer min-w-[96px]"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-base select-none">{selectedCountry.flag}</span>
                <span className="font-mono font-medium text-xs sm:text-sm">
                  {selectedCountry.dialCode}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </button>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              placeholder={t("result_page_mobile_hint")}
              maxLength={15}
              disabled={isPending}
              className="bg-white dark:bg-border flex-1"
              {...register("phone", {
                onChange: (e) => {
                  const clean = e.target.value.replace(/[^0-9]/g, "");
                  setValue("phone", clean, { shouldValidate: true });
                },
              })}
            />
          </div>
          {errors.phone?.message && (
            <ErrorText>{String(errors.phone.message)}</ErrorText>
          )}
        </div>

        {/* 2. 이메일 (필수) */}
        <div className="grid gap-1.5">
          <Label htmlFor="email">
            {t("label_email")} <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="email@example.com"
            maxLength={50}
            disabled={isPending}
            className="bg-white dark:bg-border"
            {...register("email")}
          />
          {errors.email?.message && (
            <ErrorText>{String(errors.email.message)}</ErrorText>
          )}
        </div>

        {/* 3. PIN 번호 & 확인 (필수 4자리) */}
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="pin">
              {t("result_page_pin")} <span className="text-red-500 font-bold">*</span>
            </Label>
            <InputOTP
              maxLength={4}
              value={pin || ""}
              onChange={(val) => {
                const clean = val.replace(/[^0-9]/g, "").slice(0, 4);
                setValue("pin", clean, { shouldValidate: true });
              }}
              disabled={isPending}
              containerClassName="w-full"
            >
              <InputOTPGroup className="w-full">
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={0} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={1} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={2} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={3} />
              </InputOTPGroup>
            </InputOTP>
            {errors.pin?.message && (
              <ErrorText>{String(errors.pin.message)}</ErrorText>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="pinConfirm">
              {t("result_page_pin_confirm")} <span className="text-red-500 font-bold">*</span>
            </Label>
            <InputOTP
              maxLength={4}
              value={pinConfirm || ""}
              onChange={(val) => {
                const clean = val.replace(/[^0-9]/g, "").slice(0, 4);
                setValue("pinConfirm", clean, { shouldValidate: true });
              }}
              disabled={isPending}
              containerClassName="w-full"
            >
              <InputOTPGroup className="w-full">
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={0} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={1} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={2} />
                <InputOTPSlot mask className="flex-1 h-11 bg-white dark:bg-border text-lg font-bold" index={3} />
              </InputOTPGroup>
            </InputOTP>
            {pinConfirm && pinConfirm.length > 0 && (
              <p
                className={cn(
                  "text-xs flex items-center gap-1 font-medium mt-0.5",
                  pin === pinConfirm
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                )}
              >
                {pin === pinConfirm ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{t("result_page_pin_match")}</span>
                  </>
                ) : (
                  <>
                    <X className="w-3.5 h-3.5" />
                    <span>{t("result_page_pin_mismatch")}</span>
                  </>
                )}
              </p>
            )}
            {errors.pinConfirm?.message && !pinConfirm && (
              <ErrorText>{String(errors.pinConfirm.message)}</ErrorText>
            )}
          </div>
        </div>

        {/* 4. 생년월일 (기본 제공 date picker) */}
        <div className="grid gap-1.5">
          <Label htmlFor="birthDate">
            {t("label_birth")} <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            id="birthDate"
            type="date"
            onClick={(e) => {
              try {
                e.currentTarget.showPicker?.();
              } catch {
                // ignore
              }
            }}
            min="1900-01-01"
            max={new Date().toISOString().split("T")[0]}
            disabled={isPending}
            className="bg-white dark:bg-border cursor-pointer font-mono"
            {...register("birthDate")}
          />
          {errors.birthDate?.message && (
            <ErrorText>{String(errors.birthDate.message)}</ErrorText>
          )}
        </div>

        {/* 5. 성 & 이름 (last_name, first_name) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="lastName">
              {t("result_page_last_name")} <span className="text-red-500 font-bold">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t("result_page_last_name_hint")}
              maxLength={30}
              disabled={isPending}
              className="bg-white dark:bg-border"
              {...register("lastName")}
            />
            {errors.lastName?.message && (
              <ErrorText>{String(errors.lastName.message)}</ErrorText>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="firstName">
              {t("result_page_first_name")} <span className="text-red-500 font-bold">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t("result_page_first_name_hint")}
              maxLength={30}
              disabled={isPending}
              className="bg-white dark:bg-border"
              {...register("firstName")}
            />
            {errors.firstName?.message && (
              <ErrorText>{String(errors.firstName.message)}</ErrorText>
            )}
          </div>
        </div>

        {/* 6. 성별 (남성 | 여성 토글) */}
        <div className="grid gap-1.5">
          <Label>
            {t("label_gender")} <span className="text-red-500 font-bold">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={currentGender === "남성" ? "default" : "outline"}
              onClick={() => setValue("gender", "남성", { shouldValidate: true })}
              disabled={isPending}
              className={cn(
                "h-9 font-medium",
                currentGender === "남성" &&
                  "bg-mainBlue-600 text-white hover:bg-mainBlue-700 dark:bg-mainBlue-500 dark:hover:bg-mainBlue-600"
              )}
            >
              {t("gender_male")}
            </Button>
            <Button
              type="button"
              variant={currentGender === "여성" ? "default" : "outline"}
              onClick={() => setValue("gender", "여성", { shouldValidate: true })}
              disabled={isPending}
              className={cn(
                "h-9 font-medium",
                currentGender === "여성" &&
                  "bg-mainBlue-600 text-white hover:bg-mainBlue-700 dark:bg-mainBlue-500 dark:hover:bg-mainBlue-600"
              )}
            >
              {t("gender_female")}
            </Button>
          </div>
          {errors.gender?.message && (
            <ErrorText>{String(errors.gender.message)}</ErrorText>
          )}
        </div>

        {/* 7. 개인정보 수집 및 이용 동의 */}
        <div className="grid gap-1.5 pt-1">
          <div className="flex flex-col gap-2 w-full border border-border p-3 rounded-lg bg-gray-50/50 dark:bg-card">
            <div className="flex items-center justify-between w-full">
              <span
                onClick={() => {
                  window.open(
                    "https://tangobody-terms.vercel.app/admin_page/privacy",
                    "_blank"
                  );
                }}
                className="text-xs text-muted-foreground underline cursor-pointer hover:text-foreground"
              >
                {t("result_page_privacy_agree")}
              </span>
              <input
                type="checkbox"
                id="privacyAccepted"
                disabled={isPending}
                className="h-4 w-4 rounded border-gray-350 cursor-pointer accent-mainBlue-600"
                {...register("privacyAccepted")}
              />
            </div>
          </div>
          {errors.privacyAccepted?.message && (
            <ErrorText>{String(errors.privacyAccepted.message)}</ErrorText>
          )}
        </div>

        {/* 회원가입 제출 버튼 */}
        <Button
          variant={isFormValid ? "default" : "outline"}
          type="submit"
          className={cn(
            "w-full mt-2 font-medium transition-colors",
            isFormValid &&
              "bg-mainBlue-600 text-white hover:bg-mainBlue-700 dark:bg-mainBlue-500 dark:hover:bg-mainBlue-600"
          )}
          disabled={!isFormValid || isPending}
        >
          {isPending ? t("status_signing_up") : t("result_page_signup_btn")}
        </Button>

        {/* 로그인 페이지로 돌아가기 */}
        <div className="text-center text-sm pt-1">
          {t("result_page_already_have_account")}{" "}
          <Link href="/result-page/login" className="underline underline-offset-4">
            {t("result_page_login_btn")}
          </Link>
        </div>
      </div>

      {/* 국가번호 선택 다이얼로그 */}
      <CountryCodeDialog
        open={isCountryModalOpen}
        onOpenChange={setIsCountryModalOpen}
        selectedDialCode={selectedCountry.dialCode}
        onSelect={(country) => {
          setSelectedCountry(country);
          // 국가가 변경되면 전화번호 재검증
          setValue("phone", watch("phone"), { shouldValidate: true });
        }}
      />
    </form>
  );
}

