import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { usePatchManagerPassword } from "@/hooks/auth/usePatchManagerPassword";
import { useAuthStore } from "@/providers/AuthProvider";

const EditMangerPasswordForm = () => {
  const { adminSn } = useAuthStore((state) => state);

  const { isBoolean: editState, setToggle: setEditState } = useBoolean();
  const handleEditState = () => {
    if (editState) {
      setEditState();
      return;
    }
    setEditState();
  };

  const scheme = z
    .object({
      currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
      newPassword: z
        .string()
        .min(1, "새 비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
        .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
          "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
        ),
      confirmPassword: z
        .string()
        .min(1, "비밀번호 확인을 입력해주세요.")
        .min(8, "비밀번호는 최소 8글자 이상이여야 합니다.")
        .max(16, "비밀번호는 최대 16글자 이하여야 합니다.")
        .regex(
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[a-z\d!@#$%^&*]+$/i,
          "비밀번호는 영문, 숫자, ! ~ * 특수문자를 최소 1자리 이상 입력해야합니다.",
        ),
    })
    .superRefine((arg, ctx) => {
      if (arg.newPassword !== arg.confirmPassword) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호가 일치하지 않습니다.",
          path: ["confirmPassword"],
        });
      }
      if (arg.currentPassword === arg.newPassword) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "현재 비밀번호와 새 비밀번호가 같습니다.",
          path: ["newPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheme),
  });
  const mutationChangePassword = usePatchManagerPassword(setError);
  const submitManagerPassword = handleSubmit(async (data) => {
    const { currentPassword, newPassword } = data;
    await mutationChangePassword.mutateAsync({
      sn: adminSn,
      current_password: currentPassword,
      new_password: newPassword,
    });
    setEditState();
  });
  return (
    <form onSubmit={submitManagerPassword} className="flex flex-col gap-4">
      <div className="flex w-full justify-between items-center">
        <legend className="text-xl">비밀번호 수정</legend>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={handleEditState} type="button">
            {editState ? "취소하기" : "수정하기"}
          </Button>
          {editState && (
            <Button type="submit" variant="default">
              저장하기
            </Button>
          )}
        </div>
      </div>
      {editState && (
        <>
          <div className="flex flex-col gap-2">
            <Label htmlFor="currentPassword">기존 비밀번호</Label>
            <Input
              {...register("currentPassword")}
              type="password"
              id="currentPassword"
              disabled={!editState}
              defaultValue=""
              placeholder="기존 비밀번호"
            />
            {errors.currentPassword?.message && (
              <p className="text-sm text-red-500">
                {errors.currentPassword.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword">신규 비밀번호</Label>
            <Input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              disabled={!editState}
              defaultValue=""
              placeholder="기존 비밀번호"
            />
            {errors.newPassword?.message && (
              <p className="text-sm text-red-500">
                {errors.newPassword.message.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              disabled={!editState}
              defaultValue=""
              placeholder="비밀번호 확인"
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message.toString()}
              </p>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default EditMangerPasswordForm;
