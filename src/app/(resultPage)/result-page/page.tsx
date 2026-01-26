"use client";

import React, { useEffect, useState } from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { useResultPageUserStore } from "@/providers/ResultPageUserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useResultPageUserStore((state) => state.user);
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const [decryptedData, setDecryptedData] = useState<{
    user_uuid: string;
    user_sn: number;
    user_name: string;
  } | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(true);

  useEffect(() => {
    const decryptParams = async () => {
      const encryptedKey = searchParams.get("key");
      
      if (encryptedKey) {
        try {
          const decrypted = await actionUserDecrypt(encryptedKey);
          if (decrypted) {
            setDecryptedData({
              user_uuid: decrypted.user_uuid,
              user_sn: decrypted.user_sn,
              user_name: decrypted.user_name,
            });
          } else {
            // 복호화 실패 시 로그인 페이지로 리다이렉트
            router.replace("/result-page/login");
          }
        } catch (error) {
          console.error("복호화 실패:", error);
          router.replace("/result-page/login");
        }
      } else {
        // 쿼리 파라미터가 없으면 로그인 페이지로 리다이렉트
        router.replace("/result-page/login");
      }
      setIsDecrypting(false);
    };

    decryptParams();
  }, [searchParams, router]);

  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!isDecrypting && (!isLogin || !user)) {
      router.replace("/result-page/login");
  }
  }, [isLogin, user, router, isDecrypting]);

  // 복호화 중이거나 로그인하지 않았거나 사용자 정보가 없으면 아무것도 렌더링하지 않음
  if (isDecrypting || !isLogin || !user || !decryptedData) {
    return null;
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <CenterUserDetail 
        userUUID={decryptedData.user_uuid} 
        userSn={decryptedData.user_sn} 
        userName={decryptedData.user_name}
        isResultPage={true}
      />
    </div>
  );
}

