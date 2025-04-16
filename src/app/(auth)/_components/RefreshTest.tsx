"use client";

import { Button } from "@/components/ui/button";
import { refreshAccessToken } from "@/services/auth/postRefreshAccessToken";
import React from "react";

const RefreshTest = () => {
  const handleRefreshButton = async () => {
    try {
      const res = await refreshAccessToken();
      console.log(res);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }
  return (
    <div>
      <Button onClick={handleRefreshButton}>Refresh</Button>
    </div>
  );
};

export default RefreshTest;
