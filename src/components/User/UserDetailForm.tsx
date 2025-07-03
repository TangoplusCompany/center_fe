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
      .min(2, { message: "사용자 이름을 입력해주세요." })
      .regex(/^[가-힣]+$/, { message: "한글 낱말만 입력 가능합니다." }),
    email: z.string().email({ message: "이메일 형식으로 입력해주세요." }),
    mobile: z.string().min(1, { message: "휴대폰 번호를 입력해주세요." }).regex(/^[0-9-]+$/, {
      message: "숫자, 하이픈(-)만 입력해주세요.",
    }),
    gender: z.string().optional().nullable(),
    birthday: z
      .string()
      .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {
        message: "YYYY-MM-DD 형식으로 입력해주세요.",
      })
      .min(1, { message: "생년월일을 입력해주세요." })
      .optional(),
    height: z
      .string()
      .regex(/^[0-9]*\.?[0-9]{0,1}$/, {
        message: "숫자와 소수점 첫째자리까지만 입력 가능합니다.",
      })
      .min(1, { message: "키를 입력해주세요." })
      .optional(),
    weight: z
      .string()
      .regex(/^[0-9]*\.?[0-9]{0,1}$/, {
        message: "숫자와 소수점 첫째자리까지만 입력 가능합니다.",
      })
      .min(1, { message: "몸무게를 입력해주세요." })
      .optional(),
    address: z.string().min(0, { message: "주소를 입력해주세요." }).regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }).optional(),
    addressDetail: z.string().regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
      message: "한글, 영어, 숫자, 띄어쓰기, 하이픈(-)만 입력해주세요.",
    }).optional(),
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
    <form onSubmit={submitUserDetailForm} className="flex flex-col gap-5">
      <legend className="sr-only">사용자 정보 수정</legend>
      {adminRole < 2 && (
        <div className="flex items-center justify-end gap-2">
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="userName">사용자 이름</Label>
        <Input
          {...register("userName")}
          type="text"
          id="userName"
          disabled={!editState}
          defaultValue={userData.user_name}
          placeholder="사용자 이름"
        />
        {errors.userName && (
          <p className="text-sm text-red-500">
            {errors.userName.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          disabled
          defaultValue={userData.email}
          placeholder="이메일"
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="mobile">휴대폰 번호</Label>
        <Input
          {...register("mobile")}
          type="tel"
          id="mobile"
          disabled
          defaultValue={userData.mobile}
          placeholder="휴대폰 번호"
        />
        {errors.mobile && (
          <p className="text-sm text-red-500">
            {errors.mobile.message?.toString()}
          </p>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="address">주소</Label>
          <Input
            {...register("address")}
            type="text"
            id="address"
            disabled={!editState}
            defaultValue={userData.address}
            placeholder="주소"
          />
          {errors.address && (
            <p className="text-sm text-red-500">
              {errors.address.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="addressDetail">상세주소</Label>
          <Input
            {...register("addressDetail")}
            type="text"
            id="addressDetail"
            disabled={!editState}
            defaultValue={userData.address_detail}
            placeholder="상세주소"
          />
          {errors.addressDetail && (
            <p className="text-sm text-red-500">
              {errors.addressDetail.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="gender">성별</Label>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="male"
              value="male"
              disabled={!editState}
              defaultChecked={userData.gender === "male"}
            />
            <label htmlFor="male">남</label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="female"
              value="female"
              disabled={!editState}
              defaultChecked={userData.gender === "female"}
            />
            <label htmlFor="female">여</label>
          </div>
        </div>
        {errors.gender && (
          <p className="text-sm text-red-500">
            {errors.gender.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="birthday">생년월일</Label>
        <Input
          {...register("birthday")}
          type="text"
          id="birthday"
          disabled={!editState}
          defaultValue={userData.birthday}
          placeholder="생년월일"
        />
        {errors.birthday && (
          <p className="text-sm text-red-500">
            {errors.birthday.message?.toString()}
          </p>
        )}
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="height">키</Label>
          <Input
            {...register("height")}
            type="text"
            id="height"
            disabled={!editState}
            defaultValue={userData.height}
            placeholder="키"
          />
          {errors.height && (
            <p className="text-sm text-red-500">
              {errors.height.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <Label htmlFor="weight">몸무게</Label>
          <Input
            {...register("weight")}
            type="text"
            id="weight"
            disabled={!editState}
            defaultValue={userData.weight}
            placeholder="몸무게"
          />
          {errors.weight && (
            <p className="text-sm text-red-500">
              {errors.weight.message?.toString()}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserDetailForm;
