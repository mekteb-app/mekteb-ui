import { Nivo } from "@/enums/nivo";
import { ICommunity } from "./ICommunity";
import { Status } from "@/enums/status";
import { IChildLesson } from "./IChildLesson";

interface IParent {
  id: string;
  first_name: string;
  last_name: string;
}

export interface IChild {
  id: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  social_security_number: string;
  nivo: Nivo;
  status: Status;
  created_at: string;
  updated_at: string;
  community?: ICommunity;
  parents?: IParent[];
  childLessons: IChildLesson[];
}

export interface IChildWithLesson {
  id: string;
  first_name: string;
  last_name: string;
  nivo: Nivo;
  childLessons?: IChildLesson[];
}
