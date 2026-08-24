"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ManagerInviteDialog } from "./ManagerInviteDialog";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export const ManagerPageHeader = () => {
  const t = useTranslations("Index");
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["adminList"] });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="w-full flex items-center gap-3">
        <div className="w-1 h-10 bg-mainBlue-600 rounded-full"></div>
        <h2 className="text-2xl col-span-2">{t('manager_management')}</h2>
      </div>
      <Button onClick={() => setDialogOpen(true)}>{t('manager_add')}</Button>
      <ManagerInviteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
