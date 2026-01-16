import { useBoolean } from "@/hooks/utils/useBoolean";
import { useAuthStore } from "@/providers/AuthProvider";
import { ICenterUserDetail } from "@/types/center";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { usePatchUserDetail } from "@/hooks/api/user/usePatchUserDetail";

const UserDetailForm = ({ userData }: { userData: ICenterUserDetail }) => {
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

  const schema = z.object({
    userName: z.string()
      .min(2, { message: "사용자 이름은 최소 2자 이상이어야 합니다." })
      .max(50, { message: "사용자 이름은 최대 50자까지 입력 가능합니다." })
      .regex(/^[가-힣0-9]+$/, { message: "한글과 숫자만 입력 가능합니다." }),
    gender: z.string().optional().nullable(),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "YYYY-MM-DD 형식으로 입력해주세요.",
      })
      .min(1, { message: "생년월일을 입력해주세요." })
      .optional(),
    height: z
      .string()
      .max(6, { message: "키는 최대 6자까지 입력 가능합니다." })
      .regex(/^\d*\.?\d{0,1}$/, {
        message: "숫자와 소수점 첫째자리까지만 입력 가능합니다.",
      })
      .min(1, { message: "키를 입력해주세요." })
      .optional(),
    weight: z
      .string()
      .max(6, { message: "몸무게는 최대 6자까지 입력 가능합니다." })
      .regex(/^\d*\.?\d{0,1}$/, {
        message: "숫자와 소수점 첫째자리까지만 입력 가능합니다.",
      })
      .min(1, { message: "몸무게를 입력해주세요." })
      .optional(),
    address: z.string()
      .max(60, { message: "주소는 최대 60자까지 입력 가능합니다." })
      .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
        message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
      })
      .optional(),
    addressDetail: z.string()
      .max(30, { message: "상세주소는 최대 30자까지 입력 가능합니다." })
      .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
        message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
      })
      .optional(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const mutationPatchUserDetail = usePatchUserDetail(userData.user_sn.toString());
  const submitUserDetailForm = handleSubmit(async (data) => {
    const { userName, gender, height, weight, address, addressDetail } = data;
    await mutationPatchUserDetail.mutateAsync({
      sn: userData.user_sn.toString(),
      userData: {
        user_name: userName,
        gender: gender,
        height: height,
        weight: weight,
        address: address,
        address_detail: addressDetail,
      },
    });
    setEditState();
  });
  return (
    <form onSubmit={submitUserDetailForm} className="flex flex-col gap-4 sm:gap-5">
      <legend className="sr-only">사용자 정보 수정</legend>
      {adminRole < 3 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <Button variant="outline" onClick={handleEditState} type="button" className="w-full sm:w-auto">
            {editState ? "취소하기" : "수정하기"}
          </Button>
          {editState && (
            <Button type="submit" variant="default" className="w-full sm:w-auto">
              저장하기
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="userName" className="text-sm sm:text-base">사용자 이름</Label>
        <Input
          {...register("userName")}
          type="text"
          id="userName"
          disabled={!editState}
          defaultValue={userData.user_name}
          placeholder="사용자 이름"
          maxLength={50}
          className="text-sm sm:text-base"
        />
        {errors.userName && (
          <p className="text-xs sm:text-sm text-red-500">
            {errors.userName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm sm:text-base">이메일</Label>
        <Input
          type="email"
          id="email"
          disabled
          defaultValue={userData.email}
          placeholder="이메일"
          maxLength={30}
          className="text-sm sm:text-base"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="mobile" className="text-sm sm:text-base">휴대폰 번호</Label>
        <Input
          type="tel"
          id="mobile"
          disabled
          defaultValue={userData.mobile}
          placeholder="휴대폰 번호"
          maxLength={15}
          className="text-sm sm:text-base"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm sm:text-base">주소</Label>
          <Input
            {...register("address")}
            type="text"
            id="address"
            disabled={!editState}
            defaultValue={userData.address}
            placeholder="주소"
            maxLength={60}
            className="text-sm sm:text-base"
          />
          {errors.address && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.address.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="addressDetail" className="text-sm sm:text-base">상세주소</Label>
          <Input
            {...register("addressDetail")}
            type="text"
            id="addressDetail"
            disabled={!editState}
            defaultValue={userData.address_detail}
            placeholder="상세주소"
            maxLength={30}
            className="text-sm sm:text-base"
          />
          {errors.addressDetail && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.addressDetail.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="gender" className="text-sm sm:text-base">성별</Label>
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="male"
              value="male"
              disabled={!editState}
              defaultChecked={userData.gender === "male"}
              className="w-4 h-4"
            />
            <label htmlFor="male" className="text-sm sm:text-base cursor-pointer">남</label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="female"
              value="female"
              disabled={!editState}
              defaultChecked={userData.gender === "female"}
              className="w-4 h-4"
            />
            <label htmlFor="female" className="text-sm sm:text-base cursor-pointer">여</label>
          </div>
        </div>
        {errors.gender && (
          <p className="text-xs sm:text-sm text-red-500">
            {errors.gender.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="birthday" className="text-sm sm:text-base">생년월일</Label>
        <Input
          {...register("birthday")}
          type="text"
          id="birthday"
          disabled={!editState}
          defaultValue={userData.birthday}
          placeholder="생년월일"
          className="text-sm sm:text-base"
        />
        {errors.birthday && (
          <p className="text-xs sm:text-sm text-red-500">
            {errors.birthday.message?.toString()}
          </p>
        )}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="height" className="text-sm sm:text-base">키 (cm)</Label>
          <Input
            {...register("height")}
            type="text"
            id="height"
            disabled={!editState}
            defaultValue={userData.height}
            placeholder="키"
            maxLength={6}
            className="text-sm sm:text-base"
          />
          {errors.height && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.height.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="weight" className="text-sm sm:text-base">몸무게 (kg)</Label>
          <Input
            {...register("weight")}
            type="text"
            id="weight"
            disabled={!editState}
            defaultValue={userData.weight}
            placeholder="몸무게"
            maxLength={6}
            className="text-sm sm:text-base"
          />
          {errors.weight && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.weight.message?.toString()}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserDetailForm;
