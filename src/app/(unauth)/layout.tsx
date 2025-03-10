import UnAuthLayout from "@/components/Layouts/UnAuthLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UnAuthLayout>{children}</UnAuthLayout>;
}
