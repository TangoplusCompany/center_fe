"use client";

// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { userHandlers } from "./userHandlers";
import { deviceHandlers } from "./deviceHandlers";
import { centerHandlers } from "./centerHandlers";
import { coachHandlers } from "./coachHandlers";

export const worker = setupWorker(
  ...userHandlers,
  ...deviceHandlers,
  ...centerHandlers,
  ...coachHandlers
);
