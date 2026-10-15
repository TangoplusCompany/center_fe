import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { IDeviceDetail } from "@/types/device";
import { IDeviceDetailForm } from "@/schemas/deviceSchema";
import { useTranslations } from "next-intl";

interface IDeviceDetailFormProps extends UseFormReturn<IDeviceDetailForm> {
  isEdit: boolean;
  handleEdit: () => void;
  updateDeviceDetail: () => void;
  data: IDeviceDetail;
}

const DeviceDetailForm = ({
  register,
  formState: { errors },
  updateDeviceDetail,
  data,
  isEdit,
  handleEdit,
}: IDeviceDetailFormProps) => {
  const t = useTranslations("Index");
  return (
    <form
      onSubmit={updateDeviceDetail}
      className="flex flex-col col-span-12 gap-4 relative"
    >
      <div className="relative w-full">
        <legend className="text-2xl col-span-12">{t("device_detail_title")}</legend>
        <span className="">{}</span>
      </div>
      <Label className="w-full flex flex-col gap-1" htmlFor="device_name">
        <h3 className="text-xl">{t("device_name")}</h3>
        <Input
          {...register("device_name")}
          defaultValue={data.data.device_name}
          className="w-full"
          id="device_name"
          maxLength={30}
          disabled={!isEdit}
        />
        {errors.device_name && (
          <span className="text-red-500 text-sm">
            {errors.device_name.message as string}
          </span>
        )}
      </Label>
      <Label className="w-full flex flex-col gap-1" htmlFor="install_location">
        <h3 className="text-xl">{t("device_label_install_location")}</h3>
        <Input
          {...register("install_location")}
          defaultValue={data.data.install_location}
          className="w-full"
          id="install_location"
          maxLength={30}
          disabled={!isEdit}
        />
        {errors.install_location && (
          <span className="text-red-500 text-sm">
            {errors.install_location.message as string}
          </span>
        )}
      </Label>
      <div className="flex gap-2 items-end">
        <Label
          className="w-full flex flex-col gap-1"
          htmlFor="install_address_1"
        >
          <h3 className="text-xl">{t("device_label_install_address")}</h3>
          <Input
            {...register("install_address_1")}
            defaultValue={data.data.install_address_1}
            className="w-full"
            id="install_address_1"
            maxLength={60}
            disabled={!isEdit}
          />
          {errors.install_address_1 && (
            <span className="text-red-500 text-sm">
              {errors.install_address_1.message as string}
            </span>
          )}
        </Label>
        <Label
          className="w-full flex flex-col gap-1"
          htmlFor="install_address_2"
        >
          <h3 className="text-xl">{t("device_label_install_address_detail")}</h3>
          <Input
            {...register("install_address_2")}
            defaultValue={data.data.install_address_2}
            className="w-full"
            id="install_address_2"
            maxLength={30}
            disabled={!isEdit}
          />
          {errors.install_address_2 && (
            <span className="text-red-500 text-sm">
              {errors.install_address_2.message as string}
            </span>
          )}
        </Label>
      </div>
      <div className="flex items-center justify-center gap-3 mt-10">
        <Button type="button" onClick={handleEdit} variant="outline">
          {!isEdit ? t("btn_edit_submit") : t("btn_cancel")}
        </Button>
        {isEdit && (
          <Button type="submit" className="">
            {t("btn_save")}
          </Button>
        )}
      </div>
    </form>
  );
};

export default DeviceDetailForm;
