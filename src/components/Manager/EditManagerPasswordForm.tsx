import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { usePatchManagerPassword } from "@/hooks/api/manager/usePatchManagerPassword";
import { useAuthStore } from "@/providers/AuthProvider";
import {
  IManagerPasswordForm,
  managerPasswordSchema,
} from "@/schemas/managerSchema";

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IManagerPasswordForm>({
    resolver: zodResolver(managerPasswordSchema),
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
              maxLength={16}
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
              maxLength={16}
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
              maxLength={16}
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
