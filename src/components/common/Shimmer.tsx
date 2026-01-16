import React, { useEffect, useRef, useState } from 'react';

interface ShimmerProps {
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}


export const Shimmer: React.FC<ShimmerProps> = ({ 
  className = '', 
  rounded = 'md' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setHeight(width);
      }
    };

    // 초기 높이 설정
    updateHeight();

    // ResizeObserver로 부모 크기 변화 감지
    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      ref={containerRef}
      className={`w-full bg-gray-200 animate-pulse relative overflow-hidden ${roundedClass} ${className}`}
      style={{ height: height > 0 ? `${height}px` : 'auto' }}
    >
      {/* 쉬머 효과 */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer-slide"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
        }}
      />
    </div>
  );
};