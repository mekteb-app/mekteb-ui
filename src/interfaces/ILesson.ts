import { Nivo } from "@/enums/nivo";
import { Status } from "@/enums/status";

export interface ILesson {
  id: string;
  title: string;
  description?: string;
  status: Status;
  nivo: Nivo;
  created_at: string;
  updated_at: string;
}

export interface ILessonOption {
  id: string;
  title: string;
}
