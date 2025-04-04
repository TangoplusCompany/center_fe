"use client";

import React, { useEffect } from "react";
import DefaultHeaderLayout from "./DefaultHeaderLayout";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usePathName = usePathname();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) toggleSidebar();
  }, [usePathName]);
  return (
    <main className="flex flex-col items-center justify-start min-h-screen flex-1">
      <DefaultHeaderLayout />
      <section className="w-full p-5 lg:py-0 max-w-[1200px] mx-auto my-2 md:my-5 lg:my-10">
        {children}
      </section>
    </main>
  );
}
