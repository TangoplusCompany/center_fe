import { GalleryVerticalEnd } from "lucide-react";

import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
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
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
