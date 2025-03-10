import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import DefaultSidebar from "@/components/Layouts/DefaultSidebar";

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
