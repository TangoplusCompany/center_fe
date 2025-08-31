import React from "react";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { ICenterInformation } from "@/types/center";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePatchCenterInformation } from "@/hooks/api/center/usePatchCenterInformation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuthStore } from "@/providers/AuthProvider";
import { centerEditSchema, ICenterEditForm } from "@/schemas/centerSchema";

const CenterEditForm = ({ centerData }: { centerData: ICenterInformation }) => {
  const { adminRole } = useAuthStore((state) => state);

  const { isBoolean: editState, setToggle: setEditState } = useBoolean();
  const handleEditState = () => {
    if (editState) {
      reset();
      setEditState();
      return;
    }
    setEditState();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICenterEditForm>({
    resolver: zodResolver(centerEditSchema),
  });
  const mutationEditCenterInformation = usePatchCenterInformation();
  const submitEditCenterInformation = handleSubmit(async (data) => {
    const { centerName, centerAddress, centerAddressDetail } = data;
    await mutationEditCenterInformation.mutateAsync({
      center_name: centerName,
      center_address: centerAddress,
      center_address_detail: centerAddressDetail ?? "",
    });
    setEditState();
  });
  return (
    <form
      onSubmit={submitEditCenterInformation}
      className="flex flex-col gap-4"
    >
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerName">센터 이름</Label>
        <Input
          {...register("centerName")}
          type="text"
          id="centerName"
          disabled={!editState}
          defaultValue={centerData.center_name}
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
        <Input
          {...register("centerAddress")}
          type="text"
          id="centerAddress"
          disabled={!editState}
          defaultValue={centerData.center_address}
          placeholder="센터 주소"
          maxLength={60}
        />
        {errors.centerAddress && (
          <p className="text-sm text-red-500">
            {errors.centerAddress.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="centerAddressDetail">센터 상세 주소</Label>
        <Input
          {...register("centerAddressDetail")}
          type="text"
          id="centerAddressDetail"
          disabled={!editState}
          defaultValue={centerData.center_address_detail}
          placeholder="센터 상세 주소"
          maxLength={30}
        />
        {errors.centerAddressDetail && (
          <p className="text-sm text-red-500">
            {errors.centerAddressDetail.message?.toString()}
          </p>
        )}
      </div>
    </form>
  );
};

export default CenterEditForm;
