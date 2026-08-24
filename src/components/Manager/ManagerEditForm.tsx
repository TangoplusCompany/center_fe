import { useBoolean } from "@/hooks/utils/useBoolean";
import { ICenterManagerData } from "@/types/manager";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ADMIN_ROLE } from "@/utils/constants/adminRole";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { phoneHyphen } from "@/utils/regexFiltering";
import { usePatchManagerInformation } from "@/hooks/api/manager/usePatchManagerInformation";
import {
  IManagerInformationForm,
  managerInformationSchema,
} from "@/schemas/managerSchema";
import { useTranslations } from "next-intl";

// ManagerEditForm에서 실제로 사용하는 속성만 포함하는 타입
type ManagerEditData = Pick<ICenterManagerData, 'sn' | 'admin_name' | 'mobile' | 'admin_email' | 'admin_role'>;

const ManagerEditForm = ({
  managerData,
  onUpdateSuccess,
}: {
  managerData: ManagerEditData;
  onUpdateSuccess?: () => void;
}) => {
  const t = useTranslations("Index");
  const { isBoolean: editState, setToggle: setEditState } = useBoolean();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IManagerInformationForm>({
    resolver: zodResolver(managerInformationSchema),
    mode: "onChange",
    defaultValues: {
      managerName: managerData.admin_name ?? "",
      managerMobile: managerData.mobile ?? "",
    },
  });

  const handleEditState = () => {
    if (editState) {
      reset({
        managerName: managerData.admin_name ?? "",
        managerMobile: managerData.mobile ?? "",
      });
      setEditState();
      return;
    }
    setEditState();
  };

  const mutationManagerInformation = usePatchManagerInformation();
  const submitEditManagerInformation = handleSubmit((data) => {
    const { managerName, managerMobile } = data;
    mutationManagerInformation.mutate({
      sn: managerData.sn,
      admin_name: managerName,
      mobile: managerMobile,
    });
    
    setEditState();
    
    if (onUpdateSuccess) {
      onUpdateSuccess();
    }
  });

  return (
    <form
      onSubmit={submitEditManagerInformation}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full justify-between items-center">
        <legend className="text-xl">
          {editState ? t('setting_account_info_title_1') : t('setting_account_info_title_0')}
        </legend>
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={handleEditState} type="button">
            {editState ? t('btn_cancel') : t('btn_edit_submit')}
          </Button>
          {editState && (
            <Button type="submit" variant="default">
              {t('btn_save')}
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerName">{t('setting_account_name')}</Label>
        <Input
          {...register("managerName")}
          type="text"
          id="managerName"
          disabled={!editState}
          placeholder={t('setting_account_name')}
          maxLength={50}
          value={watch("managerName") ?? ""}
        />
        {errors.managerName && (
          <p className="text-sm text-red-500">
            {errors.managerName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerMobile">{t('setting_account_phone')}</Label>
        {editState ? (
          <Input
            {...register("managerMobile")}
            type="text"
            id="managerMobile"
            placeholder={t('setting_account_phone')}
            maxLength={15}
            value={watch("managerMobile") ?? ""}
          />
        ) : (
          <Input
            type="text"
            id="managerMobile"
            disabled
            value={phoneHyphen(managerData.mobile ?? "") ?? ""}
            placeholder={t('setting_account_phone')}
            readOnly
          />
        )}
        {errors.managerMobile && (
          <p className="text-sm text-red-500">
            {errors.managerMobile.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerEmail">{t('setting_account_email')}</Label>
        <Input
          type="email"
          id="managerEmail"
          disabled
          value={managerData.admin_email ?? ""}
          placeholder={t('setting_account_email')}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerGrade">{t('setting_account_role')}</Label>
        <Input
          type="text"
          id="managerGrade"
          disabled
          value={
            t(ADMIN_ROLE[managerData.admin_role as keyof typeof ADMIN_ROLE] ?? "")
          }
          placeholder={t('setting_account_role')}
          readOnly
        />
      </div>
    </form>
  );
};

export default ManagerEditForm;
