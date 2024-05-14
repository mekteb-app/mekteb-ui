import { Status } from "@/enums/status";
import { ICommunity } from "./ICommunity";
import { IChild } from "./IChild";
import { Role } from "@/enums/role";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  phone: string;
  birthdate: string;
  social_security_number: string;
  status: Status;
  created_at: string;
  updated_at: string;
  community?: ICommunity;
  children?: IChild[];
}
