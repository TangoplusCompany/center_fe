export interface CoachData {
  id: string;
  name: string;
  phone: string;
  email: string;
  personal_date: number;
  personal_grade: CoachPersonalGrade;
  status: CoachAccessStatus;
  request: boolean;
}

export type CoachAccessStatus = "pending" | "request" | "approved" | "rejected";
export type CoachPersonalGrade = "head coach" | "assistant coach" | "manager" | "trainer" | "coach";
