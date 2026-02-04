import React from "react";
import { DarkModeToggle } from "../ui/darkmode";
import { LayoutBreadCrumb } from "./LayoutBreadCrumb";
import UpdateSessionButton from "../Util/UpdateSessionButton";
import LoginUserCircle from "../Util/LoginUserCircle";
import { useAuthStore } from "@/providers/AuthProvider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/api/auth/useLogout";
import { Button } from "@/components/ui/button";

export default function DefaultHeaderLayout() {
  const adminName = useAuthStore((state) => state.adminName);
  const adminRole = useAuthStore((state) => state.adminRole);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-10 bg-white dark:bg-black flex w-full h-auto min-h-16 md:h-20 px-4 md:px-12 py-2 md:py-5 justify-between items-center">
      <div className="flex items-center min-w-0">
        <SidebarTrigger
          className="xl:hidden shrink-0 h-9 w-9"
          aria-label="사이드바 열기"
        />
        <div className="block pl-[10px] min-w-0">
          <LayoutBreadCrumb />
        </div>
      </div>
      <div className="flex items-center gap-1 md:gap-5 shrink-0">
        <div className="hidden md:block">
          <LoginUserCircle adminName={adminName} adminRole={adminRole} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <UpdateSessionButton />
          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="text-sm md:text-base"
          >
            로그아웃
          </Button>
        </div>
        <DarkModeToggle />
      </div>
      <div className="absolute bottom-0 left-4 right-4 md:left-12 md:right-12 h-px bg-gray-300 dark:bg-gray-800"></div>
    </header>
  );
}
