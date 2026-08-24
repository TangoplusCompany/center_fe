"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { KAKAO_POSTCODE_SCRIPT_URL } from "@/lib/postcode";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ICenterEditForm } from "@/schemas/centerSchema";
import { useTranslations } from "next-intl";

export type CenterInfoFieldsProps = {
  register: UseFormRegister<ICenterEditForm>;
  errors: FieldErrors<ICenterEditForm>;
  setValue: (
    name: keyof ICenterEditForm,
    value: string,
    options?: { shouldValidate?: boolean }
  ) => void;
  disabled?: boolean;
};

const CenterInfoFields = ({
  register,
  errors,
  setValue,
  disabled = false,
}: CenterInfoFieldsProps) => {
  const t = useTranslations("Index");
  const open = useDaumPostcodePopup(KAKAO_POSTCODE_SCRIPT_URL);

  const handleAddressSearch = () => {
    open({
      onComplete: (data) => {
        setValue("centerAddress", data.address, { shouldValidate: true });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerName">{t('setting_center_name')}</Label>
        <Input
          {...register("centerName")}
          type="text"
          id="centerName"
          disabled={disabled}
          placeholder={t('setting_center_name')}
          maxLength={30}
        />
        {errors.centerName && (
          <p className="text-sm text-red-500">
            {errors.centerName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerAddress">{t('setting_center_address')}</Label>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex gap-2 md:flex-1 md:min-w-0">
            <Input
              {...register("centerAddress")}
              type="text"
              id="centerAddress"
              readOnly
              disabled={disabled}
              placeholder={t('setting_center_address_input')}
              maxLength={60}
              className="flex-1 min-w-0 bg-muted dark:bg-input"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddressSearch}
              disabled={disabled}
              className="shrink-0"
            >
              {t('setting_btn_search_address')}
            </Button>
          </div>
          <Input
            {...register("centerAddressDetail")}
            type="text"
            id="centerAddressDetail"
            disabled={disabled}
            placeholder={t('label_center_address_detail')}
            maxLength={30}
            className="w-full md:flex-1 md:min-w-0"
          />
        </div>
        {errors.centerAddress && (
          <p className="text-sm text-red-500">
            {errors.centerAddress.message?.toString()}
          </p>
        )}
        {errors.centerAddressDetail && (
          <p className="text-sm text-red-500">
            {errors.centerAddressDetail.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerPhone">{t('label_center_phone')}</Label>
        <Input
          {...register("centerPhone")}
          type="tel"
          id="centerPhone"
          disabled={disabled}
          placeholder={t('label_center_phone')}
          maxLength={20}
        />
        {errors.centerPhone && (
          <p className="text-sm text-red-500">
            {errors.centerPhone.message?.toString()}
          </p>
        )}
      </div>
    </>
  );
};

export default CenterInfoFields;
