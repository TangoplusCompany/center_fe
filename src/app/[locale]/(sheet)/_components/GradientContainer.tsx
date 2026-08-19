import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // clsx와 tailwind 병합 유틸 함수

// CVA 정의
const gradientContainerVariants = cva("", {
  variants: {
    variant: {
      primary: "bg-gradient-to-tl from-[#16286A] to-[#577BFF]",
      secondary: "bg-[#FF5449] print:bg-[#FF5449]",
      neutral: "bg-gradient-to-t from-gray-200 to-gray-100",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface GradientContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientContainerVariants> {}

const GradientContainer = ({
  children,
  className,
  variant,
  ...props
}: GradientContainerProps) => {
  return (
    <div
      className={cn(gradientContainerVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default GradientContainer;
