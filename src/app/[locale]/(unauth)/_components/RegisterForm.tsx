"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { KAKAO_POSTCODE_SCRIPT_URL } from "@/lib/postcode";
import RegisterCenterCheckForm from "./RegisterCenterCheckForm";
import { RegisterOtpDialog } from "@/components/auth/RegisterOtpDialog";
import { centerEditSchema } from "@/schemas/centerSchema";

import {
  postRequestEmailVerificationOtp,
  getRequestEmailVerificationOtpErrorMessage,
} from "@/services/auth/postRequestEmailVerificationOtp";
import {
  postRegisterAdmin,
  getRegisterAdminErrorMessage,
} from "@/services/auth/postRegisterAdmin";
import {
  getCheckDevice,
  getCheckDeviceErrorMessage,
} from "@/services/auth/getCheckDevice";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

/** 최초 가입 시에만 검사 (기존 관리자일 땐 빈 문자열 허용) */
const passwordSchema = (t: (key: string) => string) => z
  .string()
  .min(8, t('pw_min'))
  .max(16, t('pw_max'))
  .regex(
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*~])[a-z\d!@#$%^&*~]+$/i,
    t('pw_zod'),
  );
const nameSchema = (t: (key: string) => string) => z
  .string()
  .min(2, t('name_min'))
  .max(50, t('name_max'))
  .regex(/^[가-힣]+$/, t('name_zod'));
export const phoneSchema = (t: (key: string) => string) =>
  z
    .string()
    .trim()
    .min(1, t('mobile_hint'))
    // +, 숫자, 공백, 하이픈 허용
    .refine((val) => /^\+?[0-9\s-]+$/.test(val), {
      message: t('mobile_zod'),
    })
    // 맨 앞 '+' 제외 나머지 숫자 이외의 문자 제거
    .transform((val) => val.replace(/(?!^\+)\D/g, ""))
    .pipe(
      z
        .string()
        // 국가번호 포함 국제 표준(E.164) 최소 7자리 ~ 최대 15자리 (앞의 '+' 제외)
        .refine((val) => {
          const digitsOnly = val.replace(/^\+/, "");
          return digitsOnly.length >= 7 && digitsOnly.length <= 15;
        }, { message: t('mobile_min_max') })
    );

const registerSchema = (t: (key: string) => string) => z
  .object({
    email: z
      .string()
      .max(30, { message: t('email_max') })
      .email({ message: t('email_invalid') }),
    // 기존 관리자(이미 가입 이메일)일 때는 빈 문자열 허용 → 센터 정보만 검증
    password: z.union([z.literal(""), passwordSchema(t)]),
    passwordConfirm: z.union([z.literal(""), passwordSchema(t)]),
    name: z.union([z.literal(""), nameSchema(t)]),
    phone: z.union([z.literal(""), phoneSchema(t)]),
    termsAccepted: z.boolean().refine((val) => val === true, t('required_item')),
    privacyAccepted: z.boolean().refine((val) => val === true, t('required_item')),
  })
  .merge(centerEditSchema)
  .superRefine((arg, ctx) => {
    const isExistingAdminFlow =
      arg.password === "" && arg.passwordConfirm === "";
    if (isExistingAdminFlow) return;
    if (arg.password !== arg.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t('pw_invalid'),
        path: ["passwordConfirm"],
      });
    }
  });

type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;

// 에러메시지 커스텀
const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 text-start">{children}</p>;
};

export const RegisterContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceIdFromUrl = searchParams.get("device_id")?.trim() ?? "";
  const t = useTranslations("Index");
  const currentRegisterSchema = useMemo(() => registerSchema(t), [t]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(currentRegisterSchema),
    mode: "onChange", // ← 입력할 때마다 실시간 유효성 검사 실행
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      phone: "",
      centerName: "",
      centerAddress: "",
      centerAddressDetail: "",
      centerPhone: "",
      termsAccepted: false, 
      privacyAccepted: false,
    },
  });
  const isTermsAccepted = watch("termsAccepted");
  const isPrivacyAccepted = watch("privacyAccepted");
  const emailValue = watch("email") ?? "";
  const isEmailValid =
    emailValue.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim());

  const [isCheckCenter, setIsCheckCenter] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);
  /** 이메일 OTP 검증 성공 시 받은 토큰 (주관리자 회원가입 API Authorization에 사용) */
  const [emailVerificationTempToken, setEmailVerificationTempToken] =
    useState<string | null>(null);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [otpStatus, setOtpStatus] = useState<"required" | "verified" | "failed">("required");
  const [isOtpRequesting, setIsOtpRequesting] = useState(false);
  const [isAutoCheckingDevice, setIsAutoCheckingDevice] = useState(false);
  /** 200 응답(이미 가입된 관리자)인 경우: 비밀번호/이름/전화번호 숨김, 센터 정보만 입력 */
  const [isExistingAdmin, setIsExistingAdmin] = useState(false);

  // URL에 device_id가 있으면 기기 검증 자동 실행 후 회원가입 폼으로 이동
  useEffect(() => {
    if (!deviceIdFromUrl) return;
    setIsAutoCheckingDevice(true);
    getCheckDevice({ device_id: deviceIdFromUrl })
      .then((res) => {
        const token = res?.data?.temp_token;
        if (token != null) {
          setTempToken(token);
          setIsCheckCenter(true);
        }
      })
      .catch((err) => {
        const status =
          err instanceof AxiosError ? err.response?.status : undefined;
        alert(getCheckDeviceErrorMessage(status));
      })
      .finally(() => {
        setIsAutoCheckingDevice(false);
      });
  }, [deviceIdFromUrl]);

  const eventCenterCheck = (
    _centerId: string,
    token: string,
    deviceSn: number,
  ) => {
    setTempToken(token);
    void deviceSn; // 기기 검증 응답; 회원가입 API는 서버에서 처리
    setIsCheckCenter(true);
  };

  const handleOtpVerified = (
    verified: boolean,
    emailVerificationToken?: string,
  ) => {
    setOtpStatus(verified ? "verified" : "failed");
    if (verified && emailVerificationToken) {
      setEmailVerificationTempToken(emailVerificationToken);
    }
  };

  /** 주관리자 이메일 인증 OTP 요청 (temp_token 사용) - 최초 요청 시 다이얼로그 오픈 */
  const requestEmailVerificationOtp = async () => {
    if (!tempToken?.trim()) {
      alert(t('signup_device_invalid'));
      return;
    }
    const email = emailValue.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(t('signup_email_invalid'));
      return;
    }
    setIsOtpRequesting(true);
    try {
      const res = await postRequestEmailVerificationOtp({ email, tempToken });
      // 2) 기존 관리자(이미 가입한 적 있음)인 경우: OTP를 보내지 않고,
      // existing_admin_before_registering_temp_token을 register-admin Authorization에 사용
      if (
        res?.status === 200 &&
        res?.data &&
        typeof res.data === "object" &&
        "existing_admin_before_registering_temp_token" in res.data
      ) {
        const token = String(
          (res.data as { existing_admin_before_registering_temp_token: string })
            .existing_admin_before_registering_temp_token,
        );
        setIsExistingAdmin(true);
        setValue("password", "");
        setValue("passwordConfirm", "");
        setValue("name", "");
        setValue("phone", "");
        handleOtpVerified(true, token);
        setIsOtpDialogOpen(false);
        alert(t('admin_account_verified'));
        return;
      }

      // 1) 최초 가입(201)인 경우: OTP 다이얼로그 오픈
      setIsOtpDialogOpen(true);
      const remaining =
        res?.data &&
        typeof res.data === "object" &&
        "remaining_issue_count" in res.data &&
        typeof (res.data as { remaining_issue_count: unknown }).remaining_issue_count ===
          "number"
          ? (res.data as { remaining_issue_count: number }).remaining_issue_count
          : null;
      alert(
        remaining != null
          ? `${t('verification_code_sent')} (${t('remaining_send_count')}: ${remaining}${t('unit_times')})`
          : t('verification_code_sent'),
      );
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRequestEmailVerificationOtpErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : t('alert_otp_error_etc');
      alert(msg);
    } finally {
      setIsOtpRequesting(false);
    }
  };

  /** 다이얼로그 내 재전송 시 호출 (다이얼로그는 이미 열린 상태) */
  const resendEmailVerificationOtp = async () => {
    if (!tempToken?.trim()) return;
    const email = emailValue.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      const res = await postRequestEmailVerificationOtp({ email, tempToken });
      // 기존 관리자 케이스면 재전송/OTP 없이 바로 verified 처리
      if (
        res?.status === 200 &&
        res?.data &&
        typeof res.data === "object" &&
        "existing_admin_before_registering_temp_token" in res.data
      ) {
        const token = String(
          (res.data as { existing_admin_before_registering_temp_token: string })
            .existing_admin_before_registering_temp_token,
        );
        setIsExistingAdmin(true);
        setValue("password", "");
        setValue("passwordConfirm", "");
        setValue("name", "");
        setValue("phone", "");
        handleOtpVerified(true, token);
        setIsOtpDialogOpen(false);
        alert(t('admin_account_verified'));
        return;
      }

      const remaining =
        res?.data &&
        typeof res.data === "object" &&
        "remaining_issue_count" in res.data &&
        typeof (res.data as { remaining_issue_count: unknown }).remaining_issue_count ===
          "number"
          ? (res.data as { remaining_issue_count: number }).remaining_issue_count
          : null;
      alert(
        remaining != null
          ? `${t('alert_otp_request_again')} (${t('remaining_send_count')}: ${remaining}${t('unit_times')})`
          : t('alert_otp_request_again'),
      );
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRequestEmailVerificationOtpErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : t('alert_otp_request_again_fail');
      alert(msg);
    }
  };

  const openPostcode = useDaumPostcodePopup(KAKAO_POSTCODE_SCRIPT_URL);
  const handleAddressSearch = () => {
    openPostcode({
      onComplete: (data) => {
        setValue("centerAddress", data.address, { shouldValidate: true });
      },
    });
  };

  const [registerPending, setRegisterPending] = useState(false);

  const registerHandleSubmit = handleSubmit(async (values) => {
    if (otpStatus !== "verified") {
      return;
    }
    if (!emailVerificationTempToken?.trim()) {
      alert(t('email_vertify_complete'));
      return;
    }
    setRegisterPending(true);
    try {
      if (isExistingAdmin) {
        await postRegisterAdmin(
          {
            center_name: values.centerName,
            center_address: values.centerAddress,
            center_address_detail: values.centerAddressDetail ?? "",
            center_phone: values.centerPhone ?? "",
          },
          emailVerificationTempToken,
        );
      } else {
        await postRegisterAdmin(
          {
            admin_email: values.email,
            password: values.password,
            admin_name: values.name,
            admin_mobile: values.phone,
            center_name: values.centerName,
            center_address: values.centerAddress,
            center_address_detail: values.centerAddressDetail ?? "",
            center_phone: values.centerPhone ?? "",
          },
          emailVerificationTempToken,
        );
      }
      alert(t('signup_success'));
      router.push("/login");
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRegisterAdminErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : t('signup_failed');
      alert(msg);
    } finally {
      setRegisterPending(false);
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6 w-full")}
      onSubmit={registerHandleSubmit}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <legend className="sr-only">센터관리자 회원가입</legend>
        <h1 className="text-2xl font-bold mb-3 lg:mb-5">
          <span className="block sm:inline">{t('signup_admin_title')}</span>{" "}
          <span className="block sm:inline">{t('btn_signup')}</span>
        </h1>
        {!isCheckCenter ? (
          isAutoCheckingDevice ? (
            <p className="text-muted-foreground">{t('status_checking_device')}</p>
          ) : (
            <RegisterCenterCheckForm onCenterCheck={eventCenterCheck} />
          )
        ) : (
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="email" className="lg:text-lg">
                {t('user_col_email')}
              </Label>
              <div className="flex gap-2 w-full items-stretch">
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  required
                  maxLength={30}
                  {...register("email")}
                  className="bg-white dark:bg-border flex-1 h-9"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={requestEmailVerificationOtp}
                  disabled={
                    otpStatus === "verified" ||
                    !isEmailValid ||
                    isOtpRequesting
                  }
                  className="shrink-0 h-9 px-4"
                >
                  {otpStatus === "verified"
                    ? t('verification_completed')
                    : isOtpRequesting
                      ? t('status_sending')
                      : t('btn_send_code')}
                </Button>
              </div>
              {errors.email?.message && (
                <ErrorText>{String(errors.email?.message)}</ErrorText>
              )}
              {(otpStatus === "verified" || otpStatus === "failed") && (
                <p
                  className={cn(
                    "text-sm",
                    otpStatus === "verified" && "text-green-600 font-medium",
                    otpStatus === "failed" && "text-red-500"
                  )}
                >
                  {otpStatus === "verified" && t('verification_completed')}
                  {otpStatus === "failed" && t('verification_failed')}
                </p>
              )}
            </div>
            {!isExistingAdmin && (
              <>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="password" className="lg:text-lg">
                    {t('label_pw')}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    maxLength={16}
                    className="bg-white dark:bg-border"
                    {...register("password")}
                  />
                  {errors.password?.message && (
                    <ErrorText>{String(errors.password?.message)}</ErrorText>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="passwordConfirm" className="lg:text-lg">
                    {t('label_pw_confirm')}
                  </Label>

                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="********"
                    required
                    maxLength={16}
                    className="bg-white dark:bg-border"
                    {...register("passwordConfirm")}
                  />
                  {errors.passwordConfirm?.message && (
                    <ErrorText>{String(errors.passwordConfirm?.message)}</ErrorText>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="name" className="lg:text-lg">
                    {t('label_name')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Hong Gil Dong"
                    required
                    maxLength={50}
                    {...register("name")}
                    className="bg-white dark:bg-border"
                  />
                  {errors.name?.message && (
                    <ErrorText>{String(errors.name?.message)}</ErrorText>
                  )}
                </div>
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="phone" className="lg:text-lg">
                    {t('label_mobile')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    pattern="[0-9\\s-]*"
                    placeholder={t('setting_account_phone')}
                    required
                    {...register("phone", {
                      required: t('mobile_hint'),
                      minLength: { value: 11, message: t('mobile_min_max') },
                      onChange: (e) => {
                        const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                        const truncated = onlyNumber.slice(0, 11);
                        setValue("phone", truncated);
                      }
                    })}
                    className="bg-white dark:bg-border"
                  />
                  {errors.phone?.message && (
                    <ErrorText>{String(errors.phone?.message)}</ErrorText>
                  )}
                </div>
              </>
            )}
            {isExistingAdmin && (
              <p className="text-sm text-muted-foreground text-center w-full py-2">
                {t('msg_existing_email_center_only')}
              </p>
            )}
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="centerName" className="lg:text-lg">
                {t('label_center_name')}
              </Label>
              <Input
                id="centerName"
                type="text"
                placeholder={t('label_center_name')}
                maxLength={30}
                {...register("centerName")}
                className="bg-white dark:bg-border"
              />
              {errors.centerName?.message && (
                <ErrorText>{String(errors.centerName?.message)}</ErrorText>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="centerAddress" className="lg:text-lg">
                {t('label_center_address')}
              </Label>
              <div className="flex gap-2 w-full">
                <Input
                  id="centerAddress"
                  type="text"
                  readOnly
                  placeholder={t('setting_center_address_input')}
                  maxLength={60}
                  {...register("centerAddress")}
                  className="flex-1 min-w-0 bg-white dark:bg-border"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddressSearch}
                  className="shrink-0"
                >
                  {t('btn_search_address')}
                </Button>
              </div>
              <Input
                id="centerAddressDetail"
                type="text"
                placeholder={t('label_center_address_detail')}
                maxLength={30}
                {...register("centerAddressDetail")}
                className="w-full bg-white dark:bg-border"
              />
              {errors.centerAddress?.message && (
                <ErrorText>{String(errors.centerAddress?.message)}</ErrorText>
              )}
              {errors.centerAddressDetail?.message && (
                <ErrorText>{String(errors.centerAddressDetail?.message)}</ErrorText>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="centerPhone" className="lg:text-lg">
                {t('label_center_phone')}
              </Label>
              <Input
                id="centerPhone"
                type="tel"
                placeholder={t('label_center_phone')}
                maxLength={15}
                minLength={10}
                {...register("centerPhone")}
                className="bg-white dark:bg-border"
              />
              {errors.centerPhone?.message && (
                <ErrorText>{String(errors.centerPhone?.message)}</ErrorText>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="centerPhone" className="lg:text-lg">
                {t('label_terms_agreement')}
              </Label>
              <div className="flex flex-col gap-2 w-full border p-3 ">
                {/* 서비스 이용약관 */}
                <div className="flex items-center justify-between w-full">
                  <span onClick={() => {
                    window.open('https://tangobody-terms.vercel.app/admin_page/terms', '_blank');
                  }} className="text-sm text-muted-foreground underline cursor-pointer">
                    {t('terms_service_required')}
                  </span>
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    className="h-4 w-4 rounded border-gray-350"
                    {...register("termsAccepted")}
                  />
                </div>

                {/* 개인정보 처리 방침 */}
                <div className="flex items-center justify-between w-full">
                  <span onClick={() => {
                    window.open('https://tangobody-terms.vercel.app/admin_page/privacy', '_blank');
                  }} className="text-sm text-muted-foreground underline cursor-pointer">
                    {t('terms_privacy_required')}
                  </span>
                  <input
                    type="checkbox"
                    id="privacyAccepted"
                    className="h-4 w-4 rounded border-gray-350"
                    {...register("privacyAccepted")}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant={"outline"}
              className="w-full lg:text-lg"
              disabled={otpStatus !== "verified" || !isTermsAccepted || !isPrivacyAccepted || registerPending}
            >
              {registerPending ? t('status_signing_up') : t('btn_signup')}
            </Button>

            
          </div>
        )}
      </div>
      <RegisterOtpDialog
        open={isOtpDialogOpen}
        onOpenChange={setIsOtpDialogOpen}
        onVerified={handleOtpVerified}
        onRequestOtp={resendEmailVerificationOtp}
        email={emailValue.trim() || undefined}
        tempToken={tempToken}
      />
    </form>
  );
};
