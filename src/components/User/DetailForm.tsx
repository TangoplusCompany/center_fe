import { useBoolean } from "@/hooks/utils/useBoolean";
// import { useAuthStore } from "@/providers/AuthProvider";
import { ICenterUserDetail } from "@/types/center";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { usePatchUserDetail } from "@/hooks/api/user/usePatchUserDetail";
import { actionDecrypt } from "@/app/actions/getCrypto";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { ko } from "date-fns/locale";
import { useTranslations } from "next-intl";
// import { PinChangeDialog } from "./PinChangeDialog";

const UserDetailForm = ({ 
  userData, 
  isMyPage = false,
  adminRole = 0
}: { 
  userData: ICenterUserDetail;
  isMyPage?: boolean;
  adminRole?: number;
}) => {
  const t = useTranslations("Index");
  const [decryptedBirthday, setDecryptedBirthday] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { isBoolean: editState, setToggle: setEditState } = useBoolean();
  const editableFieldClass = editState ? "bg-background border border-input shadow-sm" : undefined;
  // const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);

  
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
      .min(2, { message: t('validation_user_name_min') })
      .max(50, { message: t('validation_user_name_max') })
      .regex(/^[가-힣a-zA-Z0-9]+$/, {
        message: t('validation_user_name_regex'),
      }),
    gender: z.string().optional().nullable(),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: t('validation_birth_format'),
      })
      .min(1, { message: t('validation_birth_required') })
      .optional(),
    height: z
      .string()
      .max(6, { message: t('validation_height_max') })
      .regex(/^\d*\.?\d{0,1}$/, {
        message: t('validation_height_regex'),
      })
      .min(1, { message: t('validation_height_required') })
      .optional(),
    weight: z
      .string()
      .max(6, { message: t('validation_weight_max') })
      .regex(/^\d*\.?\d{0,1}$/, {
        message: t('validation_height_regex'),
      })
      .min(1, { message: t('validation_weight_required') })
      .optional(),
    address: z.string()
      .max(60, { message: t('validation_address_max') })
      .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
        message: t('validation_address_regex'),
      })
      .optional(),
    addressDetail: z.string()
      .max(30, { message: t('validation_address_detail_max') })
      .regex(/^[가-힣a-zA-Z0-9\s-]*$/, {
        message: t('validation_address_regex'),
      })
      .optional(),
    pinPWDetail: z.string()
      .max(4, { message: t('validation_pin_length')})
      .regex(/^\d{4}$/ , { message: t('validation_pin_regex')})
      .optional()
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: userData.user_name,
      gender: userData.gender || null,
      address: userData.address || "",
      addressDetail: userData.address_detail || "",
      height: userData.height || "",
      weight: userData.weight || "",
      birthday: "",
      pinPW: "",
    },
  });

  useEffect(() => {
    // userData 변경 시 form 값 업데이트
    setValue("userName", userData.user_name);
    setValue("gender", userData.gender || null);
    setValue("address", userData.address || "");
    setValue("addressDetail", userData.address_detail || "");
    setValue("height", userData.height || "");
    setValue("weight", userData.weight || "");
  }, [userData, setValue]);

  useEffect(() => {
    const decryptBirthday = async () => {
      if (userData.birthday) {
        let birthdayString = "";
        
        // 이미 YYYY-MM-DD 형식이면 복호화 불필요
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (datePattern.test(userData.birthday)) {
          birthdayString = userData.birthday;
        } else if (isMyPage) {
          // result-page에서는 API가 이미 복호화된 데이터를 반환하므로 복호화 시도하지 않음
          birthdayString = userData.birthday;
        } else {
          try {
            birthdayString = await actionDecrypt(userData.birthday);
          } catch (error) {
            console.error("복호화 실패:", error);
            birthdayString = userData.birthday;
          }
        }
        
        setDecryptedBirthday(birthdayString);
        setValue("birthday", birthdayString);
        
        // dayjs로 Date 객체 생성
        if (birthdayString && datePattern.test(birthdayString)) {
          const date = dayjs(birthdayString, "YYYY-MM-DD").toDate();
          setSelectedDate(date);
        }
      }
    };
    
    decryptBirthday();
  }, [userData.birthday, setValue, isMyPage]);

  const mutationPatchUserDetail = usePatchUserDetail(userData.user_sn.toString(), isMyPage);
  const submitUserDetailForm = handleSubmit(async (data) => {
    const { userName, gender, height, weight, address, addressDetail, birthday } = data;
    
    if (isMyPage) {
      // result-page용 요청 데이터 (birthday, mobile 포함)
      await mutationPatchUserDetail.mutateAsync({
        sn: userData.user_sn.toString(),
        userData: {
          user_name: userName,
          gender: gender,
          height: height,
          weight: weight,
          address: address,
          address_detail: addressDetail,
          birthday: birthday,
          mobile: userData.mobile,
        },
      } as Parameters<typeof mutationPatchUserDetail.mutateAsync>[0]);
    } else {
      // 일반 페이지용 요청 데이터
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
      } as Parameters<typeof mutationPatchUserDetail.mutateAsync>[0]);
    }
    setEditState();
  });

  return (
    <form onSubmit={submitUserDetailForm} className="flex flex-col gap-4 sm:gap-5">
      <legend className="sr-only">{t('title_edit_user_info')}</legend>
      {/* isMyPage가 false이고 admin_role이 3일 때는 수정 버튼 숨김 */}
      {(isMyPage || adminRole !== 3) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <Button variant="outline" onClick={handleEditState} type="button" className="w-full sm:w-auto">
            {editState ? t('btn_cancel') : t('btn_edit_submit')}
          </Button>
          {editState && (
            <Button type="submit" variant="default" className="w-full sm:w-auto">
              {t('btn_save')}
            </Button>
          )}
        </div>
      )}
      {/* 웹: 이름·휴대폰 한 줄, 이메일 밑에 / 태블릿·모바일: 세로 배치 */}
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="userName" className="text-sm sm:text-base">{t('label_user_name')}</Label>
            <Input
              {...register("userName")}
              type="text"
              id="userName"
              disabled={!editState}
              defaultValue={userData.user_name}
              placeholder={t('label_user_name')}
              maxLength={50}
              className={cn("text-sm sm:text-base", editableFieldClass)}
            />
            {errors.userName && (
              <p className="text-xs sm:text-sm text-red-500">
                {errors.userName.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mobile" className="text-sm sm:text-base">{t('label_phone')}</Label>
            <Input
              type="tel"
              id="mobile"
              disabled
              defaultValue={userData.mobile}
              placeholder={t('label_phone')}
              maxLength={15}
              className="text-sm sm:text-base"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm sm:text-base">{t("label_email")}</Label>
          <Input
            type="email"
            id="email"
            disabled
            defaultValue={userData.email}
            placeholder={t("label_email")}
            maxLength={30}
            className="text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="address" className="text-sm sm:text-base">{t('label_address')}</Label>
          <Input
            {...register("address")}
            type="text"
            id="address"
            disabled={!editState}
            defaultValue={userData.address}
            placeholder={t('label_address')}
            maxLength={60}
            className={cn("text-sm sm:text-base", editableFieldClass)}
          />
          {errors.address && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.address.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="addressDetail" className="text-sm sm:text-base">{t('label_address_detail')}</Label>
          <Input
            {...register("addressDetail")}
            type="text"
            id="addressDetail"
            disabled={!editState}
            defaultValue={userData.address_detail}
            
            placeholder={t('label_address_detail')}
            maxLength={30}
            className={cn("text-sm sm:text-base", editableFieldClass)}
          />
          {errors.addressDetail && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.addressDetail.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="gender" className="text-sm sm:text-base">{t('label_gender')}</Label>
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="male"
              value={t('gender_male')}
              disabled={!editState}
              className="w-4 h-4"
            />
            <label htmlFor="male" className="text-sm sm:text-base cursor-pointer">{t('gender_male')}</label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              {...register("gender")}
              type="radio"
              id="female"
              value={t('gender_female')}
              disabled={!editState}
              className="w-4 h-4"
            />
            <label htmlFor="female" className="text-sm sm:text-base cursor-pointer">{t('gender_female')}</label>
          </div>
        </div>
        {errors.gender && (
          <p className="text-xs sm:text-sm text-red-500">
            {errors.gender.message?.toString()}
          </p>
        )}
      </div>
      {/* 웹: 생년월일·키·몸무게 한 줄 / 태블릿·모바일: 세로 배치 */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3">
        <div className="flex flex-col gap-2">
          <Label htmlFor="birthday" className="text-sm sm:text-base">{t('label_birth')}</Label>
          {editState ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal text-sm sm:text-base",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : t('label_birth_select')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  defaultMonth={selectedDate}
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  locale={ko}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    if (date) {
                      const formattedDate = dayjs(date).format("YYYY-MM-DD");
                      setValue("birthday", formattedDate);
                      setDecryptedBirthday(formattedDate);
                    }
                  }}
                  initialFocus
                  disabled={(date) => date > new Date()}
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Input
              type="text"
              id="birthday"
              disabled
              value={decryptedBirthday}
              placeholder={t('label_birth')}
              className="text-sm sm:text-base"
            />
          )}
          {errors.birthday && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.birthday.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="height" className="text-sm sm:text-base">{t('label_height')} (cm)</Label>
          <Input
            {...register("height")}
            type="text"
            id="height"
            disabled={!editState}
            defaultValue={userData.height}
            placeholder={t('label_height')}
            maxLength={6}
            className={cn("text-sm sm:text-base", editableFieldClass)}
          />
          {errors.height && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.height.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="weight" className="text-sm sm:text-base">{t('label_weight')} (kg)</Label>
          <Input
            {...register("weight")}
            type="text"
            id="weight"
            disabled={!editState}
            defaultValue={userData.weight}
            placeholder={t('label_weight')}
            maxLength={6}
            className={cn("text-sm sm:text-base", editableFieldClass)}
          />
          {errors.weight && (
            <p className="text-xs sm:text-sm text-red-500">
              {errors.weight.message?.toString()}
            </p>
          )}
        </div>
      </div>
      {/* <div className="flex flex-col items-end gap-2">
        <Button 
          variant="outline" 
          type="button" 
          className="w-fit sm:w-auto" 
          onClick={() => setIsPinDialogOpen(true)}>
          키오스크 PIN번호 변경
        </Button>

        <PinChangeDialog 
          open={isPinDialogOpen} 
          onOpenChange={setIsPinDialogOpen} 
        />
      </div> */}
    </form>
  );
};

export default UserDetailForm;
