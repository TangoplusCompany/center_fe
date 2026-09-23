import { useTranslations } from "next-intl";

export interface SegmentData {
  label: string;
  percentage: number;
  color: string; // HEX (#5D8DFF) 또는 Tailwind 클래스명
}

interface VerticalStackedBarProps {
  data: SegmentData[];
  width?: number;
  gap?: number;
}

export default function VerticalStackedBar({
  data,
  width = 30,
  gap = 2,
}: VerticalStackedBarProps) {
  const t = useTranslations("Index");
  return (
    <div 
      className="flex flex-col h-full" 
      style={{ 
        width: `${width}px`, 
        gap: `${gap}px` 
      }}
    >
      {data.map((segment, index) => {
        const isFirst = index === 0;
        const isLast = index === data.length - 1;

        return (
          <div
            key={index}
            style={{ 
              flex: segment.percentage, 
              backgroundColor: segment.color.startsWith('#') ? segment.color : undefined 
            }}
            className={`
              ${isFirst ? 'rounded-t-[4px]' : ''} 
              ${isLast ? 'rounded-b-[4px]' : ''}
              ${!segment.color.startsWith('#') ? segment.color : ''}
            `}
            title={`${t(segment.label)}: ${segment.percentage.toFixed(1)}%`}
          />
        );
      })}
    </div>
  );
}