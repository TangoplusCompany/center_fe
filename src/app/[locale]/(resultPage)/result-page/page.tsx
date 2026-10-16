"use client";

import React, { useEffect, useState } from "react";
import UserDetail, { viewType } from "@/components/User/Detail";
import { useResultPageUserStore } from "@/providers/ResultPageUserProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { actionUserDecrypt } from "@/app/actions/getCrypto";
import ResultPageTab from "@/components/User/My/ResultPageTab";
import { ComparePair } from "@/types/compare";
import { useTranslations } from "next-intl";
import { MeasureType } from "@/types/measure";
import ResultPageQrDialog from "@/components/ResultPage/ResultPageQrDialog";
import { QrCode, ChevronRight } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<viewType>("latest");
  const [comparePair, setComparePair] = React.useState<ComparePair>([undefined, undefined]);
  const [compareType, setCompareType] = useState<MeasureType>();
  // Store 상태
  const user = useResultPageUserStore((state) => state.user);
  const isLogin = useResultPageUserStore((state) => state.isLogin);
  const hasHydrated = useResultPageUserStore((state) => state._hasHydrated);
  const t = useTranslations("Index")
  const [decryptedData, setDecryptedData] = useState<{
    user_uuid: string;
    user_sn: number;
    user_name: string;
    encryptedKey: string;
  } | null>(null);

  // 로딩 및 검증 상태 통합
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  // 💡 [추가] URL의 ?subTab= 변경을 감지하여 currentTab 상태 동기화
  useEffect(() => {
    const subTabParam = searchParams.get("subTab") as viewType;
    if (subTabParam) {
      setCurrentTab(subTabParam);
      setComparePair([undefined, undefined]);
      setCompareType(undefined);
    } else {
      setCurrentTab("latest"); // 기본값
    }
  }, [searchParams]);
  const handleTabClick = (tabKey: viewType) => {
    // 1. 탭을 누르면 무조건 comparePair 초기화
    setComparePair([undefined, undefined]);
    setCompareType(undefined);
    setCurrentTab(tabKey);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("subTab", tabKey);
    router.push(`?${newParams.toString()}`);
  };
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
        <p className="text-sm text-muted-foreground">{t('result_page_pending')}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen">
      {/* 📱 모바일 전용 최상단 키오스크 로그인 배너 */}
      <div className="w-full md:hidden bg-gradient-to-r from-mainBlue-600 to-blue-700 text-white px-4 py-2.5 shadow-sm sticky top-0 z-30 rounded-b-md">
        <button
          type="button"
          onClick={() => setIsQrOpen(true)}
          className="w-full flex items-center justify-between text-xs sm:text-sm font-semibold active:opacity-85 transition-opacity"
          aria-label={t("result_page_qr_kiosk_login")}
        >
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </span>
            <span className="text-sm">{t("result_page_qr_kiosk_login")}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-white/90">
            <ChevronRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <div className="w-full max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        <ResultPageTab 
          userName={decryptedData.user_name} 
          currentTab={currentTab} 
          onTabClick={handleTabClick}
          onOpenQr={() => setIsQrOpen(true)}
        />
        <UserDetail 
          userUUID={decryptedData.user_uuid} 
          userSn={decryptedData.user_sn} 
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          comparePair={comparePair} 
          setComparePair={setComparePair}
          compareType={compareType}
          setCompareType={setCompareType}
          isMyPage={true}
        />
        <ResultPageQrDialog
          isOpen={isQrOpen}
          onClose={() => setIsQrOpen(false)}
          user_sn={decryptedData.user_sn}
        />
      </div>
    </div>
  );
}