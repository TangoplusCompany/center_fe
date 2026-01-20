"use server";

import { IActionKaKaoCryptoProps } from "@/types/kakaoCrypto";
import { IActionPrintCryptoProps } from "@/types/printCrypto";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = crypto
  .createHash("sha256")
  .update(process.env.TANGO_SECRET_KEY ?? "")
  .digest();
const secretIvRaw = process.env.TANGO_SECRET_IV ?? "";
const secretIv = Buffer.from(secretIvRaw, "utf8"); // 길이 16인지 한번 확인 필요

export const actionKakaoEncrypt = async (
  data: IActionKaKaoCryptoProps,
): Promise<string> => {
  if (!secretKey || !secretIvRaw) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, secretIv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const actionPrintEncrypt = async (
  data: IActionPrintCryptoProps,
): Promise<string> => {
  if (!secretKey || !secretIvRaw) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, secretIv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const actionDecrypt = async (text: string): Promise<string> => {
  if (!secretKey || !secretIvRaw) {
    return "ERROR";
  }
  const decipher = crypto.createDecipheriv(algorithm, secretKey, secretIv);
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// measure_sn, user_sn 암호화용
export interface IMeasureCryptoProps {
  measure_sn: number;
  user_sn: number;
}

export const actionMeasureEncrypt = async (
  data: IMeasureCryptoProps,
): Promise<string> => {
  if (!secretKey || !secretIvRaw) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, secretIv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  // URL safe하게 변환
  return encodeURIComponent(encrypted);
};

export const actionMeasureDecrypt = async (
  text: string,
): Promise<IMeasureCryptoProps | null> => {
  if (!secretKey || !secretIvRaw) {
    return null;
  }
  try {
    // URL decode 후 복호화
    const decoded = decodeURIComponent(text);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, secretIv);
    let decrypted = decipher.update(decoded, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted) as IMeasureCryptoProps;
  } catch (error) {
    console.error("복호화 실패:", error);
    return null;
  }
};

// user_uuid, user_sn, user_name 암호화용
export interface IUserCryptoProps {
  user_uuid: string;
  user_sn: number;
  user_name: string;
}

export const actionUserEncrypt = async (
  data: IUserCryptoProps,
): Promise<string> => {
  if (!secretKey || !secretIvRaw) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, secretIv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  // URL safe하게 변환
  return encodeURIComponent(encrypted);
};

export const actionUserDecrypt = async (
  text: string,
): Promise<IUserCryptoProps | null> => {
  if (!secretKey || !secretIvRaw) {
    return null;
  }
  try {
    // URL decode 후 복호화
    const decoded = decodeURIComponent(text);
    const decipher = crypto.createDecipheriv(algorithm, secretKey, secretIv);
    let decrypted = decipher.update(decoded, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted) as IUserCryptoProps;
  } catch (error) {
    console.error("복호화 실패:", error);
    return null;
  }
};
