import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import DefaultSidebar from "@/components/Layouts/DefaultSidebar";
import AuthStoreProvider from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AuthStoreProvider>
        <DefaultSidebar />
        <DefaultLayout>{children}</DefaultLayout>
      </AuthStoreProvider>
    </SidebarProvider>
  );
}
