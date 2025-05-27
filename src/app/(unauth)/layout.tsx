import UnAuthLayout from "@/components/Layouts/UnAuthLayout";
import { GalleryVerticalEnd } from "lucide-react";

export default function UnAuthorizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UnAuthLayout>
      <div className="h-screen w-full">
        <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#F5F5F5] dark:bg-[#1A1A1A] h-full">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              탱고플러스 - 센터
            </a>
          </div>
          {children}
        </div>
      </div>
    </UnAuthLayout>
  );
}
