"use client";

import { useState, useEffect } from "react";
import { actionMeasureDecrypt, IMeasureCryptoProps } from "@/app/actions/getCrypto";

interface UseMeasureDecryptResult {
  data: IMeasureCryptoProps | null;
  isLoading: boolean;
  isError: boolean;
}

/**
 * 암호화된 measure 파라미터를 복호화하는 훅
 * @param encryptedParam 암호화된 파라미터 문자열
 * @returns { data, isLoading, isError }
 */
export const useMeasureDecrypt = (encryptedParam: string): UseMeasureDecryptResult => {
  const [data, setData] = useState<IMeasureCryptoProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const decryptParams = async () => {
      if (!encryptedParam) {
        setIsLoading(false);
        setIsError(true);
        return;
      }

      try {
        setIsLoading(true);
        const result = await actionMeasureDecrypt(encryptedParam);
        if (result) {
          setData(result);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (error) {
        console.error("복호화 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    decryptParams();
  }, [encryptedParam]);

  return { data, isLoading, isError };
};
