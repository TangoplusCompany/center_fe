"use client";

import React, { useEffect, useState, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import dayjs from "dayjs";
import { Clock, Copy, Check, AlertCircle, RefreshCw, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetUserQRCode } from "@/hooks/api/ResultUser/useGetUserQRCode";

interface ResultPageQrDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user_sn?: number | string;
  sixDigitCode?: string;
  regDate?: string;
}

const TOTAL_VALID_SECONDS = 180;

export default function ResultPageQrDialog({
  isOpen,
  onClose,
  user_sn,
  sixDigitCode: propSixDigitCode,
  regDate: propRegDate,
}: ResultPageQrDialogProps) {
  const t = useTranslations("Index");
  const [copied, setCopied] = useState(false);
  
  const shouldFetchApi = isOpen && !propSixDigitCode && !!user_sn;
  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetUserQRCode({
    user_sn,
    enabled: shouldFetchApi,
  });

  const sixDigitCode = propSixDigitCode || apiData?.six_digit_code || "";
  const regDate = propRegDate || apiData?.reg_date;

  // 2. 남은 유효시간(초) 계산
  const initialSeconds = useMemo(() => {
    if (regDate) {
      const regTime = dayjs(regDate);
      if (regTime.isValid()) {
        const elapsed = dayjs().diff(regTime, "second");
        return Math.max(0, TOTAL_VALID_SECONDS - elapsed);
      }
    }
    return TOTAL_VALID_SECONDS;
  }, [regDate]);

  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (isOpen) {
      setRemainingSeconds(initialSeconds);
    }
  }, [isOpen, initialSeconds]);

  // 카운트다운 타이머
  useEffect(() => {
    if (!isOpen || remainingSeconds <= 0 || isLoading || isError) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, remainingSeconds, isLoading, isError]);

  const isExpired = remainingSeconds <= 0;
  const isUrgent = remainingSeconds <= 30 && !isExpired;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // 6자리 코드를 문자 배열로 분리 (없을 경우 빈 6칸 처리)
  const codeChars = useMemo(() => {
    const cleanCode = sixDigitCode.replace(/\s+/g, "").slice(0, 6);
    return Array.from({ length: 6 }, (_, i) => cleanCode[i] || "-");
  }, [sixDigitCode]);

  const handleCopyCode = async () => {
    if (!sixDigitCode) return;
    try {
      await navigator.clipboard.writeText(sixDigitCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[92vw] max-w-[420px] rounded-3xl p-0 overflow-hidden border border-border bg-white dark:bg-sub900 shadow-2xl"
      >
        <DialogTitle className="sr-only">
          {t("result_page_qr_title")}
        </DialogTitle>

        {/* 1. 상단 바: 유효시간(3분) - Dialog 기본 우측상단 닫기(X) 버튼 사용 */}
        <DialogHeader className="p-4 sm:p-5 pb-3 border-b border-gray-100 dark:border-sub800 flex flex-row items-center justify-between space-y-0 pr-12">
          {/* 유효시간 배지 */}
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors",
              isExpired
                ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800"
                : isUrgent
                ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800 animate-pulse"
                : "bg-blue-50 text-mainBlue-600 dark:bg-mainBlue-950/40 dark:text-mainBlue-400 border border-blue-200 dark:border-blue-800"
            )}
          >
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              {t("result_page_qr_valid_time")} {formatTime(remainingSeconds)}
            </span>
          </div>
        </DialogHeader>

        {/* 2. 본문 영역: 전체 크기의 QR 코드 & 6자리 코드 */}
        <div className="flex flex-col items-center justify-center p-6 gap-6">
          {/* 안내 텍스트 */}
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {t("result_page_qr_desc")}
            </p>
          </div>

          {isLoading ? (
            <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square p-5 bg-white rounded-3xl border-2 border-gray-100 dark:border-sub800 shadow-md flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-mainBlue-600 animate-spin" />
              <p className="text-xs text-gray-400">{t("result_page_qr_generating")}</p>
            </div>
          ) : isError ? (
            /* 에러 상태 */
            <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square p-5 bg-white rounded-3xl border-2 border-red-100 dark:border-red-900/40 shadow-md flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {t("result_page_qr_fetch_fail")}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-1.5 text-xs rounded-full"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t("btn_retry")}
              </Button>
            </div>
          ) : (
            /* 전체 크기의 QR 코드 카드 */
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square p-4 sm:p-5 bg-white rounded-3xl border-2 border-gray-100 dark:border-sub800 shadow-md flex items-center justify-center transition-transform hover:scale-[1.01]">
              <QRCodeSVG
                value={sixDigitCode || "000000"}
                size={280}
                level="H"
                className={cn(
                  "w-full h-full transition-opacity duration-300",
                  isExpired && "opacity-20 grayscale"
                )}
              />

              {/* 유효시간 만료 시 오버레이 */}
              {isExpired && (
                <div className="absolute inset-0 bg-white/90 dark:bg-sub900/90 rounded-3xl flex flex-col items-center justify-center p-4 text-center backdrop-blur-xs">
                  <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t("result_page_qr_expired")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 3. six_digit_code 표시 */}
          <div className="w-full flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5">
              {codeChars.map((char, index) => (
                <div
                  key={index}
                  className="w-10 h-12 sm:w-12 sm:h-14 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-sub800 border-2 border-gray-200 dark:border-sub700 text-gray-900 dark:text-white font-extrabold text-xl sm:text-2xl shadow-xs"
                >
                  {isLoading ? "-" : char}
                </div>
              ))}
            </div>

            {/* 코드 복사 버튼 */}
            {sixDigitCode && !isLoading && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="mt-1 text-xs gap-1.5 rounded-full px-3.5 py-1.5 h-8 border-gray-200 hover:bg-gray-50 dark:border-sub700 dark:hover:bg-sub800"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      {t("result_page_qr_copied")}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>{t("result_page_qr_copy")}</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}