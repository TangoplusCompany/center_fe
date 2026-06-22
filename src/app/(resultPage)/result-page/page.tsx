"use client";

import React, { useEffect, useState } from "react";
import UserDetail, { viewType } from "@/components/User/Detail";
import { useResultPageUserStore } from "@/providers/ResultPageUserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";
import ResultPageTab from "@/components/User/My/ResultPageTab";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<viewType>("latest");
  
  // Store 상태
  const user = useResultPageUserStore((state) => state.user);
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const hasHydrated = useResultPageUserStore((state) => state._hasHydrated);

  const [decryptedData, setDecryptedData] = useState<{
    user_uuid: string;
    user_sn: number;
    user_name: string;
    encryptedKey: string;
  } | null>(null);

  // 로딩 및 검증 상태 통합
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  // 💡 [추가] URL의 ?subTab= 변경을 감지하여 currentTab 상태 동기화
  useEffect(() => {
    const subTabParam = searchParams.get("subTab") as viewType;
    if (subTabParam) {
      setCurrentTab(subTabParam);
    } else {
      setCurrentTab("latest"); // 기본값
    }
  }, [searchParams]);

  // persist 복원 완료 대기
  useEffect(() => {
    if (!hasHydrated) return;

    const initAuthAndData = async () => {
      const encryptedKey = searchParams.get("key");
      
      if (!encryptedKey) {
        router.replace("/result-page/login");
        return;
      }

      try {
        const decrypted = await actionUserDecrypt(encryptedKey);
        
        if (!decrypted) {
          throw new Error("Decryption failed");
        }

        setDecryptedData({
          user_uuid: decrypted.user_uuid,
          user_sn: decrypted.user_sn,
          user_name: decrypted.user_name,
          encryptedKey: encryptedKey,
        });

        if (isLogin && user) {
          setIsStoreInitialized(true);
        } else {
          router.replace("/result-page/login");
          return;
        }
      } catch (error) {
        console.error("인증 초기화 실패:", error);
        router.replace("/result-page/login");
      }
    };

    initAuthAndData();
  }, [hasHydrated, searchParams, router, isLogin, user]);

  // Store 상태 업데이트 대기
  useEffect(() => {
    if (!isStoreInitialized || !decryptedData) return;

    if (isLogin && user) {
      setIsInitialLoading(false);
    } else {
      const timer = setTimeout(() => {
        if (!isLogin) {
          router.replace("/result-page/login");
        }
        setIsInitialLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStoreInitialized, isLogin, user, decryptedData, router]);

  if (isInitialLoading || !isLogin || !user || !decryptedData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-muted-foreground">인증 정보를 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <ResultPageTab 
        userName={decryptedData.user_name} 
        currentTab={currentTab} 
      />
      <UserDetail 
        userUUID={decryptedData.user_uuid} 
        userSn={decryptedData.user_sn} 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isMyPage={true}
      />
    </div>
  );
}