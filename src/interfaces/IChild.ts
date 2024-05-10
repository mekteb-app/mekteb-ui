import { Nivo } from "@/enums/nivo";
import { ICommunity } from "./ICommunity";
import { Status } from "@/enums/status";

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
  nivo: Nivo;
  status: Status;
  created_at: string;
  updated_at: string;
  community?: ICommunity;
  parents?: IParent[];
}
