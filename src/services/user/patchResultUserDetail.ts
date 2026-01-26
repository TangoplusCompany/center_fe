import { customUserAxios } from "@/lib/axios";
import { ICenterUserDetail } from "@/types/center";
import { IResponseDefault } from "@/types/default";

/**
 * 사용자 상세 수정 API (Result Page용)
 * @param sn 사용자 번호
 * @param userData 사용자 상세 데이터
 * @returns 사용자 상세 수정 응답
 */
export const patchResultUserDetail = async ({
  sn,
  userData,
}: {
  sn: string;
  userData: Pick<ICenterUserDetail, 'user_name' | 'address' | 'address_detail' | 'gender' | 'weight' | 'height' | 'birthday' | 'mobile'>;
}) => {
  // 요청 데이터 준비
  const requestData: Record<string, string | number> = {
    user_name: userData.user_name || "",
  };

  // address는 최대 200자
  if (userData.address !== undefined && userData.address !== null) {
    requestData.address = userData.address;
  }

  // address_detail은 최대 128자
  if (userData.address_detail !== undefined && userData.address_detail !== null) {
    requestData.address_detail = userData.address_detail;
  }

  // gender는 "male" 또는 "female"만 허용
  if (userData.gender && (userData.gender === "남성" || userData.gender === "여성")) {
    requestData.gender = userData.gender;
  }

  // height는 float (소수점 1자리까지)
  if (userData.height && userData.height.toString().trim()) {
    const heightValue = parseFloat(userData.height.toString());
    if (!isNaN(heightValue) && heightValue > 0) {
      requestData.height = parseFloat(heightValue.toFixed(1));
    }
  }

  // weight는 float (소수점 1자리까지)
  if (userData.weight && userData.weight.toString().trim()) {
    const weightValue = parseFloat(userData.weight.toString());
    if (!isNaN(weightValue) && weightValue > 0) {
      requestData.weight = parseFloat(weightValue.toFixed(1));
    }
  }

  // birthday는 "yyyy-mm-dd" 형식
  if (userData.birthday && userData.birthday.trim()) {
    requestData.birthday = userData.birthday.trim();
  }

  // mobile
  if (userData.mobile !== undefined && userData.mobile !== null) {
    requestData.mobile = userData.mobile;
  }

  // 디버깅: 요청 데이터 로깅
  console.log("patchResultUserDetail 요청 데이터:", requestData);
  
  const { data } = await customUserAxios.patch<IResponseDefault>(`/users/${sn}`, requestData);
  return data;
};
