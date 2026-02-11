"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useEffect, useState } from "react";
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

const registerSchema = z
  .object({
    email: z
      .string()
      .max(30, { message: "이메일은 최대 30자까지 입력 가능합니다." })
      .email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
      ),
    passwordConfirm: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
      .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
        "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
      ),
    name: z
      .string()
      .min(2, "이름은 최소 2글자 이상이여야 합니다.")
      .max(50, "이름은 최대 50글자 이하이여야 합니다.")
      .regex(/^[가-힣]+$/, "이름은 한글(낱말)만 입력 가능합니다."),
    phone: z
      .string()
      .min(1, "전화번호를 입력해주세요.")
      .transform((val) => val.trim().replace(/\D/g, ""))
      .pipe(
        z
          .string()
          .min(9, "전화번호는 지역번호(9~10자리) 또는 휴대폰(10~11자리) 형식이어야 합니다.")
          .max(11, "전화번호는 지역번호(9~10자리) 또는 휴대폰(10~11자리) 형식이어야 합니다.")
          .regex(/^\d+$/, "전화번호는 숫자만 입력 가능합니다."),
      ),
  })
  .merge(centerEditSchema)
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

// 에러메시지 커스텀
const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 text-start">{children}</p>;
};

export const RegisterContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceIdFromUrl = searchParams.get("device_id")?.trim() ?? "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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
    },
  });

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
      alert("기기 확인 후 이메일 인증을 진행해주세요.");
      return;
    }
    const email = emailValue.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("이메일을 올바르게 입력해주세요.");
      return;
    }
    setIsOtpRequesting(true);
    try {
      const res = await postRequestEmailVerificationOtp({ email, tempToken });
      setIsOtpDialogOpen(true);
      const remaining =
        typeof res?.data?.remaining_issue_count === "number"
          ? res.data.remaining_issue_count
          : null;
      alert(
        remaining != null
          ? `이메일로 인증번호가 전송되었습니다. (남은 발송 횟수: ${remaining}회)`
          : "이메일로 인증번호가 전송되었습니다.",
      );
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRequestEmailVerificationOtpErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : "OTP 요청에 실패했습니다.";
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
      const remaining =
        typeof res?.data?.remaining_issue_count === "number"
          ? res.data.remaining_issue_count
          : null;
      alert(
        remaining != null
          ? `OTP가 재전송되었습니다. (남은 발송 횟수: ${remaining}회)`
          : "OTP가 재전송되었습니다.",
      );
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRequestEmailVerificationOtpErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : "OTP 재전송에 실패했습니다.";
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
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    setRegisterPending(true);
    try {
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
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/login");
    } catch (e) {
      const msg =
        e instanceof AxiosError
          ? getRegisterAdminErrorMessage(e.response?.status)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: unknown }).message)
            : "회원가입에 실패했습니다.";
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
          탱고플러스 센터주관리자 회원가입
        </h1>
        {!isCheckCenter ? (
          isAutoCheckingDevice ? (
            <p className="text-muted-foreground">기기 확인 중...</p>
          ) : (
            <RegisterCenterCheckForm onCenterCheck={eventCenterCheck} />
          )
        ) : (
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="email" className="lg:text-lg">
                이메일
              </Label>
              <div className="flex gap-2 w-full items-stretch">
                <Input
                  id="email"
                  type="text"
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
                    ? "인증완료"
                    : isOtpRequesting
                      ? "전송중..."
                      : "OTP 인증"}
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
                  {otpStatus === "verified" && "인증완료"}
                  {otpStatus === "failed" && "인증번호가 맞지 않습니다."}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="password" className="lg:text-lg">
                비밀번호
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
                비밀번호 확인
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
                이름
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
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
                전화번호
              </Label>
              <Input
                id="phone"
                type="text"
                placeholder="하이픈(-)없이 입력해주세요."
                required
                maxLength={15}
                {...register("phone")}
                className="bg-white dark:bg-border"
              />
              {errors.phone?.message && (
                <ErrorText>{String(errors.phone?.message)}</ErrorText>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="centerName" className="lg:text-lg">
                센터 이름
              </Label>
              <Input
                id="centerName"
                type="text"
                placeholder="센터 이름"
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
                센터 주소
              </Label>
              <div className="flex gap-2 w-full">
                <Input
                  id="centerAddress"
                  type="text"
                  readOnly
                  placeholder="주소 검색으로 입력"
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
                  주소 검색
                </Button>
              </div>
              <Input
                id="centerAddressDetail"
                type="text"
                placeholder="센터 상세 주소"
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
                센터 번호
              </Label>
              <Input
                id="centerPhone"
                type="tel"
                placeholder="센터 번호"
                maxLength={20}
                {...register("centerPhone")}
                className="bg-white dark:bg-border"
              />
              {errors.centerPhone?.message && (
                <ErrorText>{String(errors.centerPhone?.message)}</ErrorText>
              )}
            </div>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full lg:text-lg"
              disabled={otpStatus !== "verified" || registerPending}
            >
              {registerPending ? "가입 중..." : "회원가입"}
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
