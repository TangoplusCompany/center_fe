"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSendManagerInvitation } from "@/services/manager/postSendManagerInvitation";
import { useAuthStore } from "@/providers/AuthProvider";

const inviteSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

/** 2: 부관리자, 3: 일반 */
const ROLE_VALUE = { SUB: 2, NORMAL: 3 } as const;

type ManagerInviteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export const ManagerInviteDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: ManagerInviteDialogProps) => {
  const centerSn = useAuthStore((state) => state.centerSn);
  const [role, setRole] = useState<number>(ROLE_VALUE.SUB);
  const [submitPending, setSubmitPending] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setSubmitPending(true);
    try {
      await postSendManagerInvitation(centerSn, {
        invitee_email: data.email,
        admin_role: role,
      });
      alert("매니저 초대가 전송되었습니다.");
      onOpenChange(false);
      onSuccess?.();
      form.reset();
      setRole(ROLE_VALUE.SUB);
    } catch {
      alert("매니저 초대 전송에 실패했습니다.");
    } finally {
      setSubmitPending(false);
    }
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      form.reset();
      setRole(ROLE_VALUE.SUB);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>매니저 초대</DialogTitle>
          <DialogDescription>
            초대할 매니저의 이메일과 역할을 선택한 뒤 전송해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email">초대 매니저 이메일</Label>
            <Input
              id="invite-email"
              type="email"
              placeholder="example@email.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>역할</Label>
            <RadioGroup
              value={String(role)}
              onValueChange={(v) => setRole(Number(v))}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={String(ROLE_VALUE.SUB)}
                  id="role-sub"
                />
                <Label htmlFor="role-sub" className="font-normal cursor-pointer">
                  부관리자
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value={String(ROLE_VALUE.NORMAL)}
                  id="role-normal"
                />
                <Label
                  htmlFor="role-normal"
                  className="font-normal cursor-pointer"
                >
                  일반
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={submitPending}>
            {submitPending ? "전송 중..." : "매니저 초대 전송"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
