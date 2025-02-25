"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

const MockerProvider = ({ children }: { children: ReactNode }) => {
  const [isMocking, setIsMocking] = useState(false);
  const isWorkerStarted = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !isWorkerStarted.current) {
      (async () => {
        isWorkerStarted.current = true;
        const { worker } = await import("../mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        setIsMocking(true);
      })();
    }
  });
  if (!isMocking) return null;
  return <>{children}</>;
};

export default MockerProvider;
