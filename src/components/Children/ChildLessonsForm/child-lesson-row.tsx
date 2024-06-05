import AppSwitch from "@/components/FormElements/Switch";
import AppTextarea from "@/components/FormElements/Textarea";
import { IChildWithLesson } from "@/interfaces/IChild";
import { updateChildLessons } from "../../../lib/features/children/childrenAPI";

type IChildLessonRowProps = {
  child: IChildWithLesson;
  childLessonItem: IChildLessonPayload;
  index: number;
  updateChildLesson: (
    child: IChildWithLesson,
    childLessomItem: IChildLessonPayload,
    key: string,
    value: string | boolean
  ) => void;
};

const ChildLessonRow: React.FC<IChildLessonRowProps> = ({
  child,
  childLessonItem,
  updateChildLesson,
  index,
}) => (
  <div className="w-full border-b border-[#eee] py-2">
    <div className="flex">
      <div className="flex items-center pr-2 border-r border-[#eee] lg:border-0 lg:pr-0 lg:min-w-[150px]">{`${child?.first_name} ${child?.last_name}`}</div>
      <div className="w-full pl-2 lg:pl-0">
        <div className="lg:flex items-center">
          {/* Attendance */}
          <div className="flex">
            <div>
              <AppSwitch
                id={`passed-${childLessonItem?.id ?? index}`}
                checked={childLessonItem?.passed ?? false}
                label="Passed"
                onChange={(value: boolean) =>
                  updateChildLesson(child, childLessonItem, "passed", value)
                }
              />
            </div>
            <div className="ml-2 lg:ml-4">
              <AppSwitch
                id={`attendance-${childLessonItem?.id}`}
                checked={childLessonItem?.attended ?? false}
                label="Attended"
                onChange={(value: boolean) =>
                  updateChildLesson(child, childLessonItem, "attended", value)
                }
              />
            </div>
          </div>
          {/* Comment */}
          <div className="ml-0 mt-2 lg:mt-0 lg:flex lg:ml-4 items-center w-full">
            <AppTextarea
              value={childLessonItem?.comment}
              rows={2}
              onChange={(value: string) =>
                updateChildLesson(child, childLessonItem, "comment", value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChildLessonRow;
