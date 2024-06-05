import { Nivo } from "@/enums/nivo";

export interface IChildrenLessonsPayload {
  childrenLessons: IChildLessonPayload[];
  nivo?: Nivo;
}
