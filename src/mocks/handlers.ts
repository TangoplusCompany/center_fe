// src/mocks/handlers.js

import { delay, http } from "msw";

export const handlers = [
  http.all("*:", async () => {
    await delay(50);
  }),
];
