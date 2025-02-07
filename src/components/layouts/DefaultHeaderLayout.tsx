import React from "react";
import { DarkModeToggle } from "../ui/darkmode";
import { SidebarTrigger } from "../ui/sidebar";
import { LayoutBreadcCrumb } from "./LayoutBreadCrumb";

export default function DefaultHeaderLayout() {
  return (
    <header className="flex w-full p-2 md:p-5 justify-between items-center border-b border-solid border-gray-300 dark:border-gray-800">
      <div className="flex items-center gap-2 md:gap-5">
        <SidebarTrigger />
        <LayoutBreadcCrumb />
      </div>
      <DarkModeToggle />
    </header>
  );
}
