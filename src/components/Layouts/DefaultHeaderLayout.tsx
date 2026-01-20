import React from "react";
import { DarkModeToggle } from "../ui/darkmode";
import { LayoutBreadCrumb } from "./LayoutBreadCrumb";
import UpdateSessionButton from "../Util/UpdateSessionButton";
import LoginUserCircle from "../Util/LoginUserCircle";
import { useAuthStore } from "@/providers/AuthProvider";

export default function DefaultHeaderLayout() {
  const adminName = useAuthStore((state) => state.adminName);
  const adminRole = useAuthStore((state) => state.adminRole);
  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-white dark:bg-black flex w-full h-auto min-h-16 md:h-20 px-4 md:px-12 py-2 md:py-5 justify-end md:justify-between items-center relative">
      <div className="hidden md:flex items-center gap-2 md:gap-5">
        <LayoutBreadCrumb />
      </div>
      <div className="flex items-center gap-1 md:gap-5 shrink-0">
        <LoginUserCircle adminName={adminName} adminRole={adminRole} />
        <div className="hidden md:block">
          <UpdateSessionButton />
        </div>
        <DarkModeToggle />
      </div>
      <div className="absolute bottom-0 left-4 right-4 md:left-12 md:right-12 h-px bg-gray-300 dark:bg-gray-800"></div>
    </header>
  );
}
