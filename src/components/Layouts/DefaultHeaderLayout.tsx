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
    <header className="sticky top-0 left-0 right-0 z-10 bg-white dark:bg-black flex w-full h-20 px-12 py-2 md:py-5 justify-between items-center relative">
      <div className="flex items-center gap-2 md:gap-5">
        <LayoutBreadCrumb />
      </div>
      <div className="flex items-center gap-2 md:gap-5">
        <LoginUserCircle adminName={adminName} adminRole={adminRole} />
        <UpdateSessionButton />
        <DarkModeToggle />
      </div>
      <div className="absolute bottom-0 left-12 right-12 h-px bg-gray-300 dark:bg-gray-800"></div>
    </header>
  );
}
