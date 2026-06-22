'use client';

import { Button } from "../ui/button";

interface NoticeContainerProps {
  onClose ?: ( ) => void;
  
}

export default function NoticeContainer({}: NoticeContainerProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-sub-700 backdrop-blur-sm p-4"
      // 배경을 누르면 닫히게 하고 싶다면 여기에 onClose()를 연결해도 됩니다. 현재는 X 버튼으로만 닫히게 처리.
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
      <button 
        type="button"
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="default"
            className=""
          >
            닫기
          </Button>
        </div>

    </div>
  )
}