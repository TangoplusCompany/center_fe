import axios, { AxiosError } from "axios";

export interface IUserRegisterParams {
  email: string;
  pin_password: string;
  birthday: string;
  gender: "남성" | "여성";
  mobile: string;
  country_iso: string;
  first_name: string;
  last_name: string;
  t: (key: string) => string;
}

export interface IUserRegisterResponseData {
  six_digit_code?: string;
  reg_date?: string;
  end_date?: string;
  [key: string]: unknown;
}

export interface IUserRegisterResponse {
  status: number;
  success: boolean;
  message?: string[] | string[][] | string;
  data?: IUserRegisterResponseData | IUserRegisterResponseData[];
  error_code?: string;
}

export class UserRegisterError extends Error {
  status: number;
  userMessage: string;
  errorCode?: string;
  serverMessages?: string[];
  shouldSetFieldError?: {
    field: "phone" | "email" | "pin" | "birthDate";
    message: string;
  };

  constructor(
    status: number,
    userMessage: string,
    errorCode?: string,
    serverMessages?: string[],
    shouldSetFieldError?: {
      field: "phone" | "email" | "pin" | "birthDate";
      message: string;
    }
  ) {
    super(userMessage);
    this.name = "UserRegisterError";
    this.status = status;
    this.userMessage = userMessage;
    this.errorCode = errorCode;
    this.serverMessages = serverMessages;
    this.shouldSetFieldError = shouldSetFieldError;
  }
}

/**
 * 서버 응답 상태 및 에러 코드에 맞춘 UserRegisterError 객체 생성
 */
export const extractRegisterError = (
  status: number,
  responseData: IUserRegisterResponse | undefined,
  t: (key: string) => string
): UserRegisterError => {
  let serverMessages: string[] = [];
  if (responseData?.message) {
    if (Array.isArray(responseData.message)) {
      serverMessages = responseData.message
        .flat(Infinity)
        .map((m) => String(m).trim())
        .filter(Boolean);
    } else if (typeof responseData.message === "string") {
      serverMessages = [responseData.message.trim()];
    }
  }

  const rawErrorCode = responseData?.error_code || "";
  const serverMsgCombined = serverMessages.join(", ").toLowerCase();

  // 1. 이미 등록된 전화번호 (409)
  // error_code: "PHONE_NUMBER_ALREADY_EXISTS" 또는 message: "Phone number already exists"
  if (
    status === 409 &&
    (rawErrorCode === "PHONE_NUMBER_ALREADY_EXISTS" ||
      serverMsgCombined.includes("phone number already exists") ||
      serverMsgCombined.includes("phone"))
  ) {
    const userMsg = t("result_page_phone_exists");
    return new UserRegisterError(
      409,
      userMsg,
      "PHONE_NUMBER_ALREADY_EXISTS",
      serverMessages,
      { field: "phone", message: userMsg }
    );
  }

  // 2. 이미 등록된 이메일 (409)
  // error_code: "EMAIL_ALREADY_EXISTS" 또는 message: "Email already exists"
  if (
    status === 409 &&
    (rawErrorCode === "EMAIL_ALREADY_EXISTS" ||
      serverMsgCombined.includes("email already exists") ||
      serverMsgCombined.includes("email") ||
      rawErrorCode === "")
  ) {
    const userMsg = t("result_page_email_exists");
    return new UserRegisterError(
      409,
      userMsg,
      "EMAIL_ALREADY_EXISTS",
      serverMessages,
      { field: "email", message: userMsg }
    );
  }

  // 3. 필수 파라미터 부재 및 잘못된 입력 포맷 (400)
  if (status === 400) {
    let fieldToSet: "phone" | "email" | "pin" | "birthDate" | undefined;
    if (serverMsgCombined.includes("pin")) {
      fieldToSet = "pin";
    } else if (
      serverMsgCombined.includes("birthday") ||
      serverMsgCombined.includes("birth")
    ) {
      fieldToSet = "birthDate";
    } else if (
      serverMsgCombined.includes("phone") ||
      serverMsgCombined.includes("mobile")
    ) {
      fieldToSet = "phone";
    } else if (serverMsgCombined.includes("email")) {
      fieldToSet = "email";
    }

    const userMsg =
      serverMessages.length > 0
        ? serverMessages.join("\n")
        : t("alert_register_missing_fields");

    return new UserRegisterError(
      400,
      userMsg,
      rawErrorCode,
      serverMessages,
      fieldToSet ? { field: fieldToSet, message: userMsg } : undefined
    );
  }

  // 4. 그 외 서버 에러 (500)
  if (status >= 500) {
    const userMsg =
      t("alert_sub_admin_error_500") || t("signup_failed");
    return new UserRegisterError(
      status,
      userMsg,
      rawErrorCode,
      serverMessages
    );
  }

  // 기타 상태 코드
  const fallbackMsg = serverMessages[0] || t("signup_failed");
  return new UserRegisterError(
    status,
    fallbackMsg,
    rawErrorCode,
    serverMessages
  );
};

/**
 * ResultPage(my.tangobody.co.kr) 사용자 회원가입 API
 * @param params 회원가입 요청 파라미터
 * @returns 가입 결과 데이터
 */
export const postUserRegister = async ({
  email,
  pin_password,
  birthday,
  gender,
  mobile,
  country_iso,
  first_name,
  last_name,
  t,
}: IUserRegisterParams): Promise<IUserRegisterResponseData> => {
  const cleanPhone = mobile.replace(/[^0-9]/g, "");

  try {
    const { data } = await axios.post<IUserRegisterResponse>(
      process.env.NEXT_PUBLIC_API_URL_V1 + "/register-member",
      {
        email: email.trim(),
        pin_password: pin_password.trim(),
        birthday: birthday.trim(),
        gender,
        mobile: cleanPhone,
        country_iso,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!data.success || data.status < 200 || data.status >= 300) {
      throw extractRegisterError(data.status || 400, data, t);
    }

    const rawData = Array.isArray(data.data) ? data.data[0] || {} : data.data || {};
    return rawData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<IUserRegisterResponse>;
      const status = axiosError.response?.status || 500;
      const responseData = axiosError.response?.data;
      throw extractRegisterError(status, responseData, t);
    }
    if (error instanceof UserRegisterError) {
      throw error;
    }
    throw new UserRegisterError(500, t("signup_failed"));
  }
};
