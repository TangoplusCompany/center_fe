import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      data: {
        name: "홍길동",
        age: 25,
      },
    });
  }),
];
