import { IChildPayload } from "./IChildPayload";

export interface IUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  phone: string;
  birthdate: string;
  social_security_number: string;
  newChildren: IChildPayload[];
  childrenIds: string[];
  communityId?: string;
}
