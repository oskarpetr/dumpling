import { UserType } from "./user.types";

export interface XpType {
  xpId: string;
  value: number;
  user: UserType;
  userId: string;
}

export interface XpMeType {
  value: number;
  rank: number;
}
