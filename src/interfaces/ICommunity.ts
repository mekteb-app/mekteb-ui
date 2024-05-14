import { Status } from "@/enums/status";

export interface ICommunity {
  id: string;
  name: string;
  status: Status;
  created_at: string;
  updated_at: string;
}
