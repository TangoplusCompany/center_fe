"use client";

import { Button } from "@/components/ui/button";
import {
  getDelegationMessage,
  type DelegationStatus,
} from "@/utils/delegation/getDelegationMessage";
import { CircleCheck, CircleX, Link2Off } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function parseStatus(value: string | null): DelegationStatus | null {
  if (value === "1") return 1;
  if (value === "0") return 0;
  return null;
}

const DelegationContent = () => {
  const searchParams = useSearchParams();

  const acceptToken = searchParams.get("accept_token")?.trim() ?? "";
  const status = parseStatus(searchParams.get("status"));

  const isValid = Boolean(acceptToken) && status !== null;
  const { title, description } = getDelegationMessage(isValid ? status : null);

  const isSuccess = isValid && status === 1;
  const isError = isValid && status === 0;
  const isInvalid = !isValid;

  const Icon = isInvalid ? Link2Off : isSuccess ? CircleCheck : isError ? CircleX : Link2Off;
  const iconClassName = isSuccess
    ? "text-emerald-500"
    : isError
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className={`rounded-full bg-muted p-4 ${iconClassName}`}>
            <Icon className="size-10" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground break-keep">{description}</p>
          </div>

          <Button asChild className="w-full">
            <Link href="/login">로그인 페이지로 이동</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DelegationContent;
