"use client";
import { actionEncrypt, actionDecrypt } from "@/app/actions/getCrypto";
import { IActionCryptoProps } from "@/types/crypto";

/**
 * 암호화/복호화 Hooks
 * @param cryptoData 암호화/복호화 데이터
 * @returns 암호화/복호화 데이터
 */
export const useActionEncrypt: (cryptoData: IActionCryptoProps) => Promise<string> = async (cryptoData: IActionCryptoProps) => {
  const encrypted = await actionEncrypt(cryptoData);
  return encrypted;
};
export const useActionDecrypt: (text: string) => Promise<IActionCryptoProps> = async (text: string) => {
  const decryptedString = await actionDecrypt(text);
  const decryptedData: IActionCryptoProps = JSON.parse(decryptedString);
  return decryptedData;
};
