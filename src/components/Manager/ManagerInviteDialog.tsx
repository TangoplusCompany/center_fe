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
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { postSendManagerInvitation } from "@/services/manager/postSendManagerInvitation";
import { useAuthStore } from "@/providers/AuthProvider";
import { useTranslations } from "next-intl";

/** 부관리자 초대 API 실패 시 상태별 안내 메시지 */
function getSendInvitationErrorMessage(error: unknown, t: (key: string) => string): string {
  if (error instanceof AxiosError && error.response?.status) {
    switch (error.response.status) {
      case 400:
        return t("alert_sub_admin_invite_error_400");
      case 403:
        return t("manager_invite_only_primary");
      case 409:
        return t("manager_invite_already_registered");
      case 500:
        return t("manager_invite_email_send_error");
      default:
        break;
    }
  }
  return t("manager_invite_fail");
}

const createInviteSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("alert_sub_admin_invite_meail_min"))
      .email(t("alert_sub_admin_invite_email_zod")),
  });

type InviteFormValues = {
  email: string;
};

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
  const t = useTranslations("Index");
  const centerSn = useAuthStore((state) => state.centerSn);
  const [role, setRole] = useState<number>(ROLE_VALUE.SUB);
  const [submitPending, setSubmitPending] = useState(false);

  const inviteSchema = React.useMemo(() => createInviteSchema(t), [t]);
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setSubmitPending(true);
    try {
      const res = await postSendManagerInvitation(centerSn, {
        invitee_email: data.email,
        admin_role: role,
      });
      if (res.status === 201) {
        alert(t('alert_sub_admin_invite_201'));
      } else if (res.status === 200) {
        alert(t('alert_sub_admin_invite_200'));
      } else {
        alert(t('alert_sub_admin_invite_etc'));
      }
      onOpenChange(false);
      onSuccess?.();
      form.reset();
      setRole(ROLE_VALUE.SUB);
    } catch (error) {
      alert(getSendInvitationErrorMessage(error, t));
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
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-md bg-white dark:bg-sub800">
        <DialogHeader>
          <DialogTitle>{t('manager_btn_invite')}</DialogTitle>
          <DialogDescription className="text-sub800 dark:text-sub100">
            {t('manager_invite_desc_0')} <br />
            {t('manager_invite_desc_1')}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="invite-email">{t('manager_invite_email_label')}</Label>
            <Input
              id="invite-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="example@email.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm text-sub400" />

          <Button type="submit" disabled={submitPending}>
            {submitPending ? t('btn_sub_admin_invite_pending') : t('btn_sub_admin_invite')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
