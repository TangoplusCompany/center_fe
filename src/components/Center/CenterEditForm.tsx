"use client";

import React from "react";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { ICenterInformation } from "@/types/center";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePatchCenterInformation } from "@/hooks/api/center/usePatchCenterInformation";
import { Button } from "../ui/button";
import { useAuthStore } from "@/providers/AuthProvider";
import { centerEditSchema, ICenterEditForm } from "@/schemas/centerSchema";
import CenterInfoFields from "@/components/Center/CenterInfoFields";

export type CenterEditFormProps = {
  centerData: ICenterInformation;
  /** 팝업 사용 시 저장 성공 후 호출 (예: 팝업 닫기) */
  onSuccess?: () => void;
  /** 팝업 사용 시 취소 시 호출 (예: 팝업 닫기) */
  onCancel?: () => void;
  /** "dialog"일 때 헤더(타이틀) 숨김 (다이얼로그에서 사용) */
  variant?: "inline" | "dialog";
};

const CenterEditForm = ({
  centerData,
  onSuccess,
  onCancel,
  variant = "inline",
}: CenterEditFormProps) => {
  const { adminRole } = useAuthStore((state) => state);

  const { isBoolean: editState, setToggle: setEditState } = useBoolean();
  const handleEditState = () => {
    if (editState) {
      reset({
        centerName: centerData.center_name,
        centerAddress: centerData.center_address,
        centerAddressDetail: centerData.center_address_detail ?? "",
        centerPhone: centerData.center_phone ?? "",
      });
      setEditState();
      onCancel?.();
      return;
    }
    setEditState();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICenterEditForm>({
    resolver: zodResolver(centerEditSchema),
    defaultValues: {
      centerName: centerData.center_name,
      centerAddress: centerData.center_address,
      centerAddressDetail: centerData.center_address_detail ?? "",
      centerPhone: centerData.center_phone ?? "",
    },
  });

  const mutationEditCenterInformation = usePatchCenterInformation();
  const submitEditCenterInformation = handleSubmit(async (data) => {
    const { centerName, centerAddress, centerAddressDetail, centerPhone } =
      data;
    await mutationEditCenterInformation.mutateAsync({
      center_name: centerName,
      center_address: centerAddress,
      center_address_detail: centerAddressDetail ?? "",
      center_phone: centerPhone ?? "",
    });
    setEditState();
    onSuccess?.();
  });
  return (
    <form
      onSubmit={submitEditCenterInformation}
      className="flex flex-col gap-4"
    >
      {variant === "inline" && (
        <div className="flex w-full justify-between items-center">
          <legend className="text-xl">
            {editState ? "센터 정보 수정" : "센터 정보"}
          </legend>
          {adminRole < 2 && (
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
          )}
        </div>
      )}
      {variant === "dialog" && (
        <div className="flex w-full justify-end gap-2">
          {adminRole < 2 && (
            <>
              <Button variant="outline" onClick={handleEditState} type="button">
                {editState ? "취소하기" : "수정하기"}
              </Button>
              {editState && (
                <Button type="submit" variant="default">
                  저장하기
                </Button>
              )}
            </>
          )}
        </div>
      )}
      <CenterInfoFields
        register={register}
        errors={errors}
        setValue={setValue}
        disabled={!editState}
      />
    </form>
  );
};

export default CenterEditForm;
