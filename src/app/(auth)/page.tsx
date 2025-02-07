import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <p>MAIN</p>
      <Button>Click me</Button>
      <Link href={"/login"}>로그인</Link>
    </div>
  );
}
