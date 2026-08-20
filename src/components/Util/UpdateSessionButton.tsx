"use client";

import { useLoginTimeout } from "@/hooks/utils/useLoginTimeout";
import { Button } from "../ui/button";
import { formatTime } from "@/utils/formatDate";
import { useTranslations } from "next-intl";

const UpdateSessionButton = () => {
  const { remainingSeconds, resetTimer } = useLoginTimeout();
  const t = useTranslations("Index")
  const handleUpdateSession = () => {
    resetTimer();
    alert("로그인이 연장되었습니다.");
  };
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <p className="hidden md:block w-28 md:w-32">
        {t('header_time')} <strong>{formatTime(remainingSeconds)}</strong>
      </p>
      <Button onClick={handleUpdateSession} variant="outline" className="text-sm md:text-base">
        {t('header_extention')}
      </Button>
    </div>
  );
};

export default UpdateSessionButton;
