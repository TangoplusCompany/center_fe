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
  const setLoginFromResponse = useResultPageUserStore((state) => state.setLoginFromResponse);
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

            // sessionStorage에 데이터가 없으면 쿼리 파라미터의 정보로 store 초기화
            // (로그인 직후 sessionStorage에 저장되기 전에 페이지가 이동했을 수 있음)
            try {
              const storedData = sessionStorage.getItem("result-page-user");
              if (!storedData) {
                // sessionStorage에 데이터가 없으면 쿠키와 쿼리 파라미터로 임시 초기화
                const hasResultPageLogin = document.cookie.includes("resultPageLogin=true");
                if (hasResultPageLogin) {
                  // 쿠키가 있으면 로그인 상태로 간주하고 store 초기화
                  // access_token은 없지만, 쿠키가 있으면 로그인 상태로 간주
                  setLoginFromResponse({
                    user: {
                      user_sn: decrypted.user_sn,
                      user_name: decrypted.user_name,
                      user_uuid: decrypted.user_uuid,
                      mobile: "", // 쿼리 파라미터에 없음
                      pin_login_fail_count: 0,
                      pin_account_locked: 0,
                      pin_login_last_date: "",
                    },
                    access_token: "", // 쿼리 파라미터에 없지만 쿠키가 있으면 로그인 상태로 간주
                  });
                }
              }
            } catch (error) {
              console.error("sessionStorage 확인 실패:", error);
            }
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
  }, [searchParams, router, setLoginFromResponse]);

  useEffect(() => {
    // 복호화가 완료된 후에만 체크
    if (!isDecrypting) {
      // 쿠키 체크 (추가 안전장치)
      const hasResultPageLogin = document.cookie.includes("resultPageLogin=true");
      
      // 쿠키가 없거나 로그인 상태가 아니면 로그인 페이지로 리다이렉트
      // 단, 상태 업데이트를 기다리기 위해 약간의 딜레이를 둠
      if (!hasResultPageLogin || !isLogin || !user) {
        // 상태 업데이트가 완료될 시간을 주기 위해 약간의 딜레이
        // React 상태 업데이트와 쿠키 반영이 완료되도록 보장
        const timeoutId = setTimeout(() => {
          // 다시 한 번 체크 (상태가 업데이트되었을 수 있음)
          const recheckCookie = document.cookie.includes("resultPageLogin=true");
          
          // 쿠키와 상태를 다시 확인
          if (!recheckCookie || !isLogin || !user) {
            router.replace("/result-page/login");
          }
        }, 150);
        
        return () => clearTimeout(timeoutId);
      }
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

