import { Status } from "@/enums/status";
import { ILesson } from "./ILesson";

export interface IChildLesson {
  id?: string;
  comment: string;
  status?: Status;
  created_at?: string;
  updated_at?: string;
  lesson: ILesson;
  passed: boolean;
  mark?: number;
}
