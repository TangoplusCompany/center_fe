"use client";

import { useAuthStore } from "@/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const SUB_ADMIN_RESTRICTED_PREFIXES = ["/device", "/manager"];

const isRestrictedPathForSubAdmin = (pathname: string) =>
  SUB_ADMIN_RESTRICTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export default function SubAdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminRole = useAuthStore((state) => state.adminRole);
  const pathname = usePathname();
  const router = useRouter();

  const isRestricted =
    adminRole === 2 && isRestrictedPathForSubAdmin(pathname);

  useEffect(() => {
    if (isRestricted) {
      router.replace("/");
    }
  }, [isRestricted, router]);

  if (isRestricted) {
    return null;
  }

  return <>{children}</>;
}
