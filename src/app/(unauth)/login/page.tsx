import { GalleryVerticalEnd } from "lucide-react";

import LoginForm from "@/components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-full">
      <div className="relative hidden bg-muted lg:block">
        <Image src={"/images/login-background.png"} alt="로그인 이미지" width={1400} height={1400} priority={true} className="absolute object-cover inset-0 h-full w-full" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            탱고플러스 - 센터
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
