"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-5 lg:p-0 box-border">
      <Image
        src={"/not-found.jpg"}
        width={600}
        height={600}
        property="404 Error Page"
        priority
        className="w-full rounded-lg"
        alt="https://kr.freepik.com/free-vector/404-error-isometric-illustration_7740133.htm#fromView=keyword&page=3&position=21&uuid=1b8ffc77-a368-4d36-8d17-193fabd121ef&query=404+Error+Page"
      />
      <h2 className="text-2xl">페이지를 찾을 수 없습니다.</h2>
      <p className="text-center break-keep">
        페이지가 존재하지 않거나, 사용할 수 없는페이지입니다. <br />
        입력하신 주소가 정확한지 다시 한 번 확인해주세요.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded font-medium"
      >
        메인으로
      </Link>
    </div>
  );
}
