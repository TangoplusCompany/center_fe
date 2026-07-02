import React from "react";

interface BalloonProps {
  message: string;
  direction?: "top" | "left";
  buttonText?: string;
  onClickButton?: () => void;
  onClose: () => void;
  className?: string; 
}

export default function Balloon({
  message,
  direction = "top",
  buttonText,
  onClickButton,
  onClose,
  className = "",
}: BalloonProps) {
  return (
    <div
      className={`absolute z-50 w-60 bg-mainBlue-600 text-white p-3 rounded-xl shadow-xl animate-in fade-in duration-200 ${className}`}
    >
      {/* 꼬리 (삼각형) */}
      {direction === "top" && (
        <div className="absolute -top-1 right-4 w-2.5 h-2.5 bg-mainBlue-600 rotate-45" />
      )}
      {direction === "left" && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-mainBlue-600 rotate-45" />
      )}

      {/* 상단 텍스트 및 X 버튼 */}
      <div className="flex justify-between items-start gap-2">
        <p className="text-xs font-medium leading-relaxed text-left whitespace-pre-line">
          {message}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-white/80 hover:text-white p-0.5 cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 하단 버튼 */}
      {buttonText && onClickButton && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClickButton();
            }}
            className="text-[10px] font-bold bg-white text-mainBlue-600 px-2 py-1 rounded-md hover:bg-sub100 transition-colors cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}