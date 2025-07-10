import { useBoolean } from "@/hooks/utils/useBoolean";
import { ICenterManagerData } from "@/types/manager";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { ADMIN_ROLE } from "@/utils/constants";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { phoneHyphen } from "@/utils/regexFiltering";
import { usePatchManagerInformation } from "@/hooks/api/manager/usePatchManagerInformation";
import {
  IManagerInformationForm,
  managerInformationSchema,
} from "@/schemas/managerSchema";
const ManagerEditForm = ({
  managerData,
}: {
  managerData: ICenterManagerData;
}) => {
  const { isBoolean: editState, setToggle: setEditState } = useBoolean();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IManagerInformationForm>({
    resolver: zodResolver(managerInformationSchema),
  });

  const handleEditState = () => {
    if (editState) {
      reset();
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
  });

  return (
    <form
      onSubmit={submitEditManagerInformation}
      className="flex flex-col gap-4"
    >
      <div className="flex w-full justify-between items-center">
        <legend className="text-xl">
          {editState ? "개인 정보 수정" : "개인 정보"}
        </legend>
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerName">이름</Label>
        <Input
          {...register("managerName")}
          type="text"
          id="managerName"
          disabled={!editState}
          defaultValue={managerData.admin_name}
          placeholder="이름"
        />
        {errors.managerName && (
          <p className="text-sm text-red-500">
            {errors.managerName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerMobile">전화번호</Label>
        <Input
          {...register("managerMobile")}
          type="text"
          id="managerMobile"
          disabled={!editState}
          defaultValue={phoneHyphen(managerData.mobile)}
          placeholder="전화번호"
        />
        {errors.managerMobile && (
          <p className="text-sm text-red-500">
            {errors.managerMobile.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerEmail">이메일</Label>
        <Input
          type="email"
          id="managerEmail"
          disabled
          defaultValue={managerData.admin_email}
          placeholder="이메일"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="managerGrade">등급</Label>
        <Input
          type="text"
          id="managerGrade"
          disabled
          defaultValue={
            ADMIN_ROLE[managerData.admin_role as keyof typeof ADMIN_ROLE]
          }
          placeholder="등급"
        />
      </div>
    </form>
  );
};

export default ManagerEditForm;
