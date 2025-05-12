"use server";

import { IActionCryptoProps } from "@/types/crypto";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey = crypto
  .createHash("sha256")
  .update(process.env.TANGO_SECRET_KEY!)
  .digest();
const secretIv = process.env.TANGO_SECRET_IV;

export const actionEncrypt = async (
  data: IActionCryptoProps,
): Promise<string> => {
  if (!secretKey || !secretIv) {
    return "ERROR";
  }
  const cipher = crypto.createCipheriv(algorithm, secretKey, secretIv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const actionDecrypt = async (text: string): Promise<string> => {
  if (!secretKey || !secretIv) {
    return "ERROR";
  }
  const decipher = crypto.createDecipheriv(algorithm, secretKey, secretIv);
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
