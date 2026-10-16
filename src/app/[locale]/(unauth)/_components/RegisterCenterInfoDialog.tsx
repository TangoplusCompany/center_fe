"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CenterInfoFields from "@/components/Center/CenterInfoFields";
import { centerEditSchema, ICenterEditForm } from "@/schemas/centerSchema";
import { useTranslations } from "next-intl";

export type RegisterCenterInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** 회원가입 시 센터 정보 입력 팝업 (테스트용) */
export const RegisterCenterInfoDialog = ({
  open,
  onOpenChange,
}: RegisterCenterInfoDialogProps) => {
  const t = useTranslations("Index");
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<ICenterEditForm>({
    resolver: zodResolver(centerEditSchema),
    defaultValues: {
      centerName: "",
      centerAddress: "",
      centerAddressDetail: "",
      centerPhone: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto sm:rounded-2xl"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>{t("setting_center_info_title")}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <CenterInfoFields
            register={register}
            errors={errors}
            setValue={setValue}
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            {t("btn_confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
