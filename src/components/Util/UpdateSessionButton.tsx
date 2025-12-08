"use client";

import { useLoginTimeout } from "@/hooks/utils/useLoginTimeout";
import { Button } from "../ui/button";
import { formatTime } from "@/utils/formatDate";

const UpdateSessionButton = () => {
  const { remainingSeconds, resetTimer } = useLoginTimeout();

  const handleUpdateSession = () => {
    resetTimer();
    alert("로그인이 연장되었습니다.");
  };
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <p className="w-28 md:w-32">
        남은 시간: <strong>{formatTime(remainingSeconds)}</strong>
      </p>
      <Button onClick={handleUpdateSession} variant="outline">로그인 연장</Button>
    </div>
  );
};

export default UpdateSessionButton;
