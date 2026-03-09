"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const returnHome = () => {
    router.push("/");
  };
  return (
    <main className="flex flex-col items-center justify-start min-h-screen flex-1">
      <header className="flex w-full p-2 md:p-5 justify-between items-center border-b border-solid border-gray-300 dark:border-gray-800">
        <div className="flex items-center gap-2 md:gap-5">
          <Image src="/icons/app_logo.svg" width={60} height={60} alt="탱고로고" className="size-10" />
          <p className="text-2xl font-bold">Tango Body</p>
        </div>
      </header>
      <section className="w-full p-5 lg:py-0 max-w-[1200px] mx-auto my-2 md:my-5 lg:my-10">
        <div className="flex-1 flex flex-col items-center justify-center gap-5 p-5 lg:p-0 box-border">
          <Image
            src={"/images/not_found.png"}
            width={1280}
            height={720}
            property="404 Error Page"
            priority
            className="w-full max-w-[1200px] rounded-2xl"
            alt="https://kr.freepik.com/free-vector/404-error-isometric-illustration_7740133.htm#fromView=keyword&page=3&position=21&uuid=1b8ffc77-a368-4d36-8d17-193fabd121ef&query=404+Error+Page"
          />
          {/* <h2 className="text-2xl">페이지를 찾을 수 없습니다.</h2>
          <p className="text-center break-keep">
            페이지가 존재하지 않거나, 사용할 수 없는페이지입니다. <br />
            입력하신 주소가 정확한지 다시 한 번 확인해주세요.
          </p> */}
          <Button
            onClick={returnHome}
            className="text-xl p-4"
          >
            ← 메인으로 돌아가기
          </Button>
        </div>
      </section>
    </main>
  );
}
