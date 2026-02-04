"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

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

export function LayoutBreadCrumb() {
  const pathName = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* 기존 BreadCrumb 헤더 주석처리 - 센터목록으로 대체 */}
        {/* <BreadcrumbItem>
          <BreadcrumbLink className="text-base xl:text-xl" href="/">탱고플러스 센터</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {pathName === "/" ? (
                <p className="text-slate-950 text-base xl:text-xl dark:text-foreground">대시보드</p>
              ) : (
                <p className="text-slate-950 text-base xl:text-xl dark:text-foreground">
                  {Menus.filter((el) => el.url !== "/").find((menu) => pathName.includes(menu.url))
                    ?.title || "Not Found"}
                </p>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {Menus
                .filter((menu) => {
                  if (adminRole === 2) {
                    return !["기기 관리", "매니저 관리"].includes(menu.title);
                  }
                  if (adminRole >= 3) {
                    return !["대시보드", "기기 관리", "매니저 관리", "사용자 히스토리 관리", "센터 측정 현황"].includes(menu.title);
                  }
                  return true;
                })
                .map((menu, index) => (
                  <DropdownMenuItem key={menu.title + menu.initial + index}>
                    <BreadcrumbLink href={menu.url}>{menu.title}</BreadcrumbLink>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem> */}
        <BreadcrumbItem>
          <BreadcrumbLink
            className={`text-base xl:text-xl ${pathName === "/center" ? "font-semibold text-toggleAccent" : "text-slate-950 dark:text-foreground"}`}
            href="/center"
          >
            센터목록
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
