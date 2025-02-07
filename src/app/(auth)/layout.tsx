import DefaultLayout from "@/components/layouts/DefaultLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import DefaultSidebar from "@/components/layouts/DefaultSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DefaultSidebar />
      <DefaultLayout>{children}</DefaultLayout>
    </SidebarProvider>
  );
}
