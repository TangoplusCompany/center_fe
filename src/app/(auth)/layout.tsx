"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import DefaultSidebar from "@/components/Layouts/DefaultSidebar";
import AuthStoreProvider from "@/providers/AuthProvider";
import { useEffect } from "react";
import { createAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authStore = createAuthStore();
  const router = useRouter();
  useEffect(() => {
    const hasLogin = document.cookie.includes("isLogin=true");
    if (!hasLogin) {
      authStore.getState().setLogout();
      router.replace("/login");
    }
  }, []);
  return (
    <SidebarProvider>
      <AuthStoreProvider>
        <DefaultSidebar />
        <DefaultLayout>{children}</DefaultLayout>
      </AuthStoreProvider>
    </SidebarProvider>
  );
}
