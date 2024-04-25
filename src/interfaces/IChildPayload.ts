import { Nivo } from "@/enums/nivo";

export interface IChildPayload {
  first_name: string;
  last_name: string;
  birthdate: string;
  nivo: Nivo | undefined;
  parentIds?: string[];
  communityId?: string;
}
