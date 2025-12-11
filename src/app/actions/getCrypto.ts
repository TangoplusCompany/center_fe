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
