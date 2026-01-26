"use client";

import React, { useEffect, useState } from "react";
import CenterUserDetail from "@/components/User/CenterUserDetail";
import { useResultPageUserStore } from "@/providers/ResultPageUserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Store 상태
  const user = useResultPageUserStore((state) => state.user);
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const setLoginFromResponse = useResultPageUserStore((state) => state.setLoginFromResponse);

  const [decryptedData, setDecryptedData] = useState<{
    user_uuid: string;
    user_sn: number;
    user_name: string;
  } | null>(null);

  // 로딩 및 검증 상태 통합
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  useEffect(() => {
    const initAuthAndData = async () => {
      const encryptedKey = searchParams.get("key");
      
      if (!encryptedKey) {
        router.replace("/result-page/login");
        return;
      }

      try {
        // 1. 파라미터 복호화
        const decrypted = await actionUserDecrypt(encryptedKey);
        
        if (!decrypted) {
          throw new Error("Decryption failed");
        }

        setDecryptedData({
          user_uuid: decrypted.user_uuid,
          user_sn: decrypted.user_sn,
          user_name: decrypted.user_name,
        });

        // 2. Store에 이미 데이터가 있으면 쿠키 체크 건너뛰기
        if (isLogin && user) {
          // 이미 로그인 상태이므로 추가 처리 불필요
          setIsStoreInitialized(true);
        } else {
          // 3. 쿠키 확인 및 Store 데이터 복구
          const hasCookie = document.cookie.includes("resultPageLogin=true");
          
          if (hasCookie) {
            setLoginFromResponse({
              user: {
                user_sn: decrypted.user_sn,
                user_name: decrypted.user_name,
                user_uuid: decrypted.user_uuid,
                mobile: "",
                pin_login_fail_count: 0,
                pin_account_locked: 0,
                pin_login_last_date: "",
              },
              access_token: "", 
            });
            // Store 초기화 완료 표시 (상태 업데이트는 다음 useEffect에서 감지)
            setIsStoreInitialized(true);
          } else {
            // 쿠키조차 없으면 튕겨냄
            router.replace("/result-page/login");
            return;
          }
        }
      } catch (error) {
        console.error("인증 초기화 실패:", error);
        router.replace("/result-page/login");
      }
    };

    initAuthAndData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router, setLoginFromResponse]);

  // Store 상태가 실제로 업데이트될 때까지 기다리기
  useEffect(() => {
    if (!isStoreInitialized || !decryptedData) return;

    if (isLogin && user) {
      setIsInitialLoading(false);
    } else {
      // 만약 쿠키는 있는데 스토어 반영이 늦어지는 경우를 대비해 
      // 강제로 한 번 더 스토어 확인을 하거나 리다이렉트 시점을 명확히 함
      const timer = setTimeout(() => {
        if (!isLogin) {
          // 1초 뒤에도 로그인이 안 되어 있다면 세션이 끊긴 것으로 간주
          router.replace("/result-page/login");
        }
        setIsInitialLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStoreInitialized, isLogin, user, decryptedData, router]);

  // 최종 렌더링 전 방어막
  if (isInitialLoading || !isLogin || !user || !decryptedData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-muted-foreground">인증 정보를 확인 중입니다...</p>
      </div>
    );
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