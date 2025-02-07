import UnAuthLayout from "@/components/layouts/UnAuthLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <UnAuthLayout>{children}</UnAuthLayout>;
}
