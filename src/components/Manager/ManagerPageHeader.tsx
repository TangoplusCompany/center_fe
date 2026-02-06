"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ManagerInviteDialog } from "./ManagerInviteDialog";
import { useQueryClient } from "@tanstack/react-query";

export const ManagerPageHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["adminList"] });
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl">매니저 관리</h1>
      <Button onClick={() => setDialogOpen(true)}>매니저 추가</Button>
      <ManagerInviteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
