"use client";

import React from "react";
import DefaultHeaderLayout from "./DefaultHeaderLayout";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col items-center justify-start min-h-screen">
      <DefaultHeaderLayout />
      <section className="w-full min-w-0 p-4 md:p-12 lg:px-12 lg:py-0 max-w-[1200px] mx-auto my-2 md:my-5 lg:my-10">
        {children}
      </section>
    </main>
  );
}
