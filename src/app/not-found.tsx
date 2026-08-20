import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <html lang="ko">
      <body>
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
                src="/images/not_found.png"
                width={1280}
                height={720}
                priority
                className="w-full max-w-[1200px] rounded-2xl"
                alt="404 Error"
              />
              <Link
                href="/"
                className="text-xl p-4 bg-primary text-primary-foreground rounded-md inline-block"
              >
                ← 메인으로 돌아가기
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}