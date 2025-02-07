"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

interface IMenu {
  title: string;
  url: string;
  initial: string;
}

const Menus: IMenu[] = [
  {
    title: "메인화면",
    url: "/",
    initial: "",
  },
  {
    title: "사용자 관리",
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
    title: "환경 설정",
    url: "/setting",
    initial: "setting",
  },
];

export function LayoutBreadcCrumb() {
  const pathName = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">CENTER</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <p>
                {Menus.find((menu) => menu.url === pathName)?.title ||
                  "Not Found"}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {Menus.map((menu, index) => (
                <DropdownMenuItem key={menu.title + menu.initial + index}>
                  <BreadcrumbLink href={menu.url}>{menu.title}</BreadcrumbLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
