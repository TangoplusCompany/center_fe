"use client";

import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ICenterEditForm } from "@/schemas/centerSchema";

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
  const open = useDaumPostcodePopup();

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
        <Label htmlFor="centerName">센터 이름</Label>
        <Input
          {...register("centerName")}
          type="text"
          id="centerName"
          disabled={disabled}
          placeholder="센터 이름"
          maxLength={30}
        />
        {errors.centerName && (
          <p className="text-sm text-red-500">
            {errors.centerName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerAddress">센터 주소</Label>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="flex gap-2 md:flex-1 md:min-w-0">
            <Input
              {...register("centerAddress")}
              type="text"
              id="centerAddress"
              readOnly
              disabled={disabled}
              placeholder="주소 검색으로 입력"
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
              주소 검색
            </Button>
          </div>
          <Input
            {...register("centerAddressDetail")}
            type="text"
            id="centerAddressDetail"
            disabled={disabled}
            placeholder="센터 상세 주소"
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
        <Label htmlFor="centerPhone">센터 번호</Label>
        <Input
          {...register("centerPhone")}
          type="tel"
          id="centerPhone"
          disabled={disabled}
          placeholder="센터 번호"
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
