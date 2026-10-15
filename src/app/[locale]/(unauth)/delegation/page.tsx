import type { Metadata } from "next";
import { Suspense } from "react";
import DelegationContent from "./_components/DelegationContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Index");
  return {
    title: t("delegation_page_title"),
    description: t("delegation_page_desc"),
  };
}

export default async function DelegationPage() {
  const t = await getTranslations("Index");
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">{t("delegation_checking_result")}</p>
        </div>
      }
    >
      <DelegationContent />
    </Suspense>
  );
}