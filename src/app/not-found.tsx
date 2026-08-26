import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <html lang="ko">
      <body className="antialiased m-0 p-0 bg-[#f5f8fc] text-foreground">
        <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-[#F1F4FB]">
          {/* Header */}
          <header className="flex w-full shrink-0 px-6 py-4 items-center bg-white/80 backdrop-blur-sm border-b border-border/40 z-20">
            <div className="flex items-center gap-3">
              <Image
                src="/icons/app_logo.svg"
                width={36}
                height={36}
                alt="탱고로고"
                className="size-8 md:size-9 object-contain"
              />
              <p className="text-xl font-bold tracking-tight">Tango Body</p>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="relative flex-1 w-full flex items-center justify-center">
            {/* 중앙 일러스트 이미지 (배경색과 자연스럽게 블렌딩) */}
            <div className="relative w-[640px] md:w-[1280px] aspect-[16/9] -translate-y-10">
              <Image
                src="/images/not_found.png"
                fill
                priority
                className="object-contain"
                alt="404 Error"
              />
            </div>

            {/* 전체 화면 하단 30% 지점에 위치하는 버튼 */}
            <div className="absolute inset-x-0 bottom-[27.5%] flex justify-center z-10">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base md:text-lg font-medium text-white bg-mainBlue-600 rounded-xl shadow-md transition-all duration-200 ease-out hover:bg-mainBlue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
              >
                <span className="transition-transform duration-200 ease-out group-hover:-translate-x-1">
                  &larr;
                </span>
                <span>메인으로 돌아가기</span>
              </Link>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}