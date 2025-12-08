"use client";

import React from "react";
import DefaultHeaderLayout from "./DefaultHeaderLayout";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen flex-1">
      <DefaultHeaderLayout />
      <section className="w-full p-12 lg:py-0 max-w-[1920px] mx-auto my-2 md:my-5 lg:my-10">
        {children}
      </section>
    </main>
  );
}
