"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/providers/AuthProvider";

/* 기존 BreadCrumb용 Menus - 주석 해제 시 사용
interface IMenu {
  title: string;
  url: string;
  initial: string;
}

const Menus: IMenu[] = [
  {
    title: "대시보드",
    url: "/",
    initial: "",
  },
  {
    title: "센터 측정 현황",
    url: "/measure",
    initial: "measure",
  },
  {
    title: "사용자 회원 관리",
    url: "/user",
    initial: "user",
  },
  {
    title: "코치 관리",
    url: "/coach",
    initial: "coach",
  },
  {
    title: "기기 관리",
    url: "/device",
    initial: "device",
  },
  {
    title: "매니저 관리",
    url: "/manager",
    initial: "manager",
  },
  {
    title: "설정",
    url: "/setting",
    initial: "setting",
  },
];
*/

const breadcrumbLinkClass =
  "text-base xl:text-xl transition-all duration-200 rounded-md px-1.5 py-0.5 -mx-1.5 -my-0.5 hover:opacity-80 hover:bg-muted/60";

export function LayoutBreadCrumb() {
  const pathName = usePathname();
  const router = useRouter();
  const centerSn = useAuthStore((state) => state.centerSn);
  const centerName = useAuthStore((state) => state.centerName);

  const isCenterPage = pathName === "/center";
  const nameLabel = centerSn && centerName ? centerName : "센터목록";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="flex items-center gap-1.5">
          {isCenterPage ? (
            <span
              className={`${breadcrumbLinkClass} font-semibold text-toggleAccent cursor-default hover:opacity-90`}
              aria-current="page"
            >
              센터목록
            </span>
          ) : (
            <>
              <span
                className={`${breadcrumbLinkClass} font-medium text-slate-950 dark:text-foreground cursor-default max-md:hidden`}
              >
                {nameLabel}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => router.push("/center")}
                className="border-input bg-background text-blue-600 dark:text-blue-400 font-bold hover:bg-accent hover:text-accent-foreground text-base"
              >
                센터목록
              </Button>
            </>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
