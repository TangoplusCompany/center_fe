import React, { useState, useEffect } from 'react';

const AILoadingScreen = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const messages = [
    "AI 분석 결과를 받고 있습니다.",
    "맞춤형 운동을 선정하고 있습니다."
  ];

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    
    if (isTyping) {
      // 타이핑 효과
      if (displayedText.length < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentMessage.slice(0, displayedText.length + 1));
        }, 80); // 타이핑 속도
        return () => clearTimeout(timeout);
      } else {
        // 타이핑 완료 후 2초 대기
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      // 슬라이드 아웃 후 다음 메시지로
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }, 500); // 슬라이드 아웃 시간
      return () => clearTimeout(timeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedText, isTyping, currentMessageIndex]);

  return (
    <div className="h-[512px] rounded-3xl flex flex-col items-center justify-center bg-gradient-to-b from-toggleAccent/10 to-white dark:from-toggleAccent/20 dark:to-muted p-8">
      {/* 회전하는 원형 로더 */}
      <div className="relative mb-12">
        {/* 외곽 원 */}
        <div className="w-32 h-32 rounded-full border-4 border-sub200 dark:border-border"></div>
        
        {/* 회전하는 그라데이션 원 */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-transparent border-t-toggleAccent border-r-toggleAccent animate-spin"></div>
      </div>

      {/* 타이핑 텍스트 */}
      <div className="h-16 flex items-center justify-center">
        <p 
          className={`text-lg font-medium text-black dark:text-foreground transition-all duration-500 ${
            isTyping ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {displayedText}
          {isTyping && displayedText.length < messages[currentMessageIndex].length && (
            <span className="inline-block w-0.5 h-5 bg-sub600 dark:bg-muted-foreground ml-1 animate-pulse"></span>
          )}
        </p>
      </div>

      {/* 진행 상황 표시 (선택사항) */}
      {/* <div className="mt-8 flex gap-2">
        {messages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentMessageIndex 
                ? 'bg-blue-500 w-8' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default AILoadingScreen;