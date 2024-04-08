import { Status } from "@/enums/status";
import { ICommunity } from "./ICommunity";
import { IChild } from "./IChild";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  phone: string;
  birthdate: string;
  status: Status;
  created_at: string;
  updated_at: string;
  community?: ICommunity;
  children?: IChild[];
}
