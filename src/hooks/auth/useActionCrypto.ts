"use client";
import { actionKakaoEncrypt, actionDecrypt } from "@/app/actions/getCrypto";
import { IActionKaKaoCryptoProps } from "@/types/kakaoCrypto";

/**
 * 암호화/복호화 Hooks
 * @param cryptoData 암호화/복호화 데이터
 * @returns 암호화/복호화 데이터
 */
export const useActionEncrypt: (cryptoData: IActionKaKaoCryptoProps) => Promise<string> = async (cryptoData: IActionKaKaoCryptoProps) => {
  const encrypted = await actionKakaoEncrypt(cryptoData);
  return encrypted;
};
export const useActionDecrypt: (text: string) => Promise<IActionKaKaoCryptoProps> = async (text: string) => {
  const decryptedString = await actionDecrypt(text);
  const decryptedData: IActionKaKaoCryptoProps = JSON.parse(decryptedString);
  return decryptedData;
};
