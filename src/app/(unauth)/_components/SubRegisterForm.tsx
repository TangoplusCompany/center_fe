"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { postRegisterSubAdmin } from "@/services/auth/postRegisterSubAdmin";

/** 부관리자 회원가입 API 실패 시 상태별 안내 메시지 */
function getRegisterSubAdminErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.status) {
    switch (error.response.status) {
      case 400:
        return "필수 정보가 누락되었거나 올바르지 않습니다.";
      case 401:
        return "유효하지 않은 초대 링크입니다. 링크를 다시 확인하거나 재발급 요청해주세요.";
      case 409:
        return "이미 해당 센터에 등록된 부관리자입니다.";
      case 500:
        return "회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      default:
        break;
    }
  }
  return "회원가입에 실패했습니다. 다시 시도해주세요.";
}

const subRegisterSchema = z
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
      .min(10, "전화번호는 최소 10글자 이상이여야 합니다.")
      .max(15, "전화번호는 최대 15글자 이하여야 합니다.")
      .regex(/^\d{10,15}$/, "전화번호는 숫자만 10~15자 입력 가능합니다."),
  })
  .superRefine((arg, ctx) => {
    if (arg.password !== arg.passwordConfirm) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

type SubRegisterFormValues = z.infer<typeof subRegisterSchema>;

const ErrorText = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm text-red-500 text-start">{children}</p>;
};

export const SubRegisterContainer = ({
  token,
  email,
}: {
  token: string;
  email?: string;
}) => {
  const router = useRouter();
  const [submitPending, setSubmitPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SubRegisterFormValues>({
    resolver: zodResolver(subRegisterSchema),
    defaultValues: {
      email: email || "",
    },
    mode: "onChange",
  });

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");
  const phone = watch("phone");
  const emailValue = watch("email") ?? "";

  const isFormValid = useMemo(() => {
    return (
      isValid &&
      password &&
      passwordConfirm &&
      name &&
      phone &&
      password.length >= 8 &&
      passwordConfirm.length >= 8 &&
      name.length >= 2 &&
      phone.length >= 10 &&
      !errors.password &&
      !errors.passwordConfirm &&
      !errors.name &&
      !errors.phone
    );
  }, [isValid, password, passwordConfirm, name, phone, errors]);

  const registerHandleSubmit = handleSubmit(async (data) => {
    if (!token?.trim()) {
      alert("유효한 초대 링크가 아닙니다. 링크를 다시 확인해주세요.");
      return;
    }
    setSubmitPending(true);
    try {
      await postRegisterSubAdmin({
        sub_admin_invitation_token: token,
        invitee_email: data.email.trim() || emailValue.trim(),
        mobile: data.phone,
        admin_name: data.name,
        password: data.password,
      });
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      router.push("/login");
    } catch (error) {
      alert(getRegisterSubAdminErrorMessage(error));
    } finally {
      setSubmitPending(false);
    }
  });

  return (
    <form
      className={cn("flex flex-col gap-6 w-full")}
      onSubmit={registerHandleSubmit}
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <legend className="sr-only">회원가입</legend>
        <h1 className="text-2xl font-bold mb-3 lg:mb-5">
          탱고플러스 센터 부관리자 회원가입
        </h1>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col items-start gap-2">
            <Label htmlFor="email" className="lg:text-lg">
              이메일
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="email@example.com"
              required
              maxLength={30}
              readOnly
              disabled
              {...register("email")}
              className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
            />
            {errors.email?.message && (
              <ErrorText>{String(errors.email?.message)}</ErrorText>
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
          <Button
            type="submit"
            variant="outline"
            className="w-full lg:text-lg"
            disabled={!isFormValid || submitPending}
          >
            {submitPending ? "가입 중..." : "회원가입"}
          </Button>
        </div>
      </div>
    </form>
  );
};
