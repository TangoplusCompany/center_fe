import UnAuthLayout from "@/components/Layouts/UnAuthLayout";


export default function UnAuthorizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UnAuthLayout>
      <div className="min-h-[100dvh] w-full">
        <div className="flex min-h-[100dvh] flex-col gap-4 p-6 md:p-10 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
          <div className="flex justify-center gap-2 md:justify-start">
          </div>
          {children}
          <div className="flex-1" />
          <div className="text-center text-sm text-muted-foreground">
            TangoBody V1.0 Web
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
}