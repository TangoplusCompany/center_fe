import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// "pending" | "request" | "approved" | "rejected"
const statusVariants = cva("px-2 rounded-sm text-xs text-white leading-[24px] mx-auto", {
  variants: {
    variant: {
      pending: "bg-[#24303F]",
      request: "bg-[#2C4FD0]",
      approved: "bg-[#36ABFF]",
      rejected: "bg-[#000]",
    },
  },
});

export interface DivProps
  extends React.ButtonHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {}

const UserStatus = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div className={statusVariants({ variant, className })} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);
UserStatus.displayName = "UserStatus";

export { UserStatus, statusVariants };
