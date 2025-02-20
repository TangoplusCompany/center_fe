export type UserData = {
  id: string;
  name: string;
  phone: string;
  score: number;
  email: string;
  status: UserAcessStatus | string;
  request: boolean;
};

export type UserAcessStatus = "pending" | "request" | "approved" | "rejected";
