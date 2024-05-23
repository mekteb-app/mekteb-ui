import AppSwitch from "@/components/FormElements/Switch";
import useLessons from "@/hooks/useLessons";
import { IChildLesson } from "@/interfaces/IChildLesson";
import { ILesson } from "@/interfaces/ILesson";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { Role } from "@/enums/role";
import AppTextarea from "@/components/FormElements/Textarea";
import useChildren from "@/hooks/useChildren";

type IChildLessonItem = {
  id?: string;
  comment: string;
  passed: boolean;
  childId: string;
  lessonId: string;
};

const LessonsPane: React.FC = () => {
  const { lessons, getLessons } = useLessons();
  const { child, updateChildLessons } = useChildren();
  const currentUser = useAppSelector(selectCurrentUser);

  const [isEditMode, setEditMode] = useState(false);
  const [changedLessons, setChangedLessons] = useState<IChildLessonPayload[]>(
    []
  );

  const findChildLesson = (lesson: ILesson): IChildLessonItem => {
    const changedChildLesson: IChildLessonPayload | undefined =
      changedLessons.find((cl) => cl.lessonId === lesson.id);

    const childLesson: IChildLesson | undefined = (
      child?.childLessons ?? []
    )?.find((cl: IChildLesson) => cl.lesson.id === lesson.id);

    return {
      id: childLesson?.id,
      childId: child?.id ?? "",
      lessonId: lesson.id,
      comment: changedChildLesson?.comment ?? childLesson?.comment ?? "",
      passed: changedChildLesson?.passed ?? childLesson?.passed ?? false,
    };
  };

  const updateChildLesson = useCallback(
    (
      lessonId: string,
      childLesson: IChildLessonItem,
      key: string,
      value: string | boolean
    ) => {
      setChangedLessons((prevLessons) => {
        const childLessonIndex = prevLessons.findIndex(
          (cl: IChildLessonPayload) => cl.lessonId === lessonId
        );
        if (childLessonIndex !== -1) {
          const updatedLessons = [...prevLessons];
          updatedLessons[childLessonIndex] = {
            ...updatedLessons[childLessonIndex],
            [key]: value,
          };
          return updatedLessons;
        } else {
          const updatedLessons = [
            ...prevLessons,
            {
              id: childLesson?.id,
              childId: child?.id ?? "",
              lessonId,
              comment:
                key === "comment"
                  ? (value as string)
                  : childLesson?.comment ?? "",
              passed:
                key === "passed"
                  ? (value as boolean)
                  : childLesson?.passed ?? false,
            },
          ];
          return updatedLessons;
        }
      });
    },
    [child?.id]
  );

  const isAdmin = useMemo(
    () =>
      currentUser?.role &&
      [(Role.Admin, Role.SuperAdmin)].includes(currentUser?.role),
    [currentUser?.role]
  );

  const resetChildLessonsState = useCallback(() => {
    setChangedLessons([]);
    setEditMode(!isEditMode);
  }, [isEditMode]);

  const saveChildLessons = useCallback(async () => {
    if (isAdmin) {
      await updateChildLessons(changedLessons);
    }
    resetChildLessonsState();
  }, [changedLessons, isAdmin, resetChildLessonsState, updateChildLessons]);

  const lessonRow = (lesson: ILesson) => {
    const childLessonItem = findChildLesson(lesson);
    return (
      <tr key={lesson.id}>
        <td>{lesson.title}</td>
        <td>
          <div className="lg:flex items-center">
            <AppSwitch
              id={lesson?.id}
              checked={childLessonItem.passed}
              disabled={!isEditMode}
              onChange={(value: boolean) =>
                isAdmin &&
                isEditMode &&
                updateChildLesson(lesson?.id, childLessonItem, "passed", value)
              }
            />
            {isAdmin ? (
              <div className="ml-1 mt-2 lg:mt-0 lg:ml-4 w-full">
                <AppTextarea
                  value={childLessonItem.comment}
                  disabled={!isEditMode}
                  rows={1}
                  onChange={(value: string) =>
                    updateChildLesson(
                      lesson?.id,
                      childLessonItem,
                      "comment",
                      value
                    )
                  }
                />
              </div>
            ) : (
              <div className="ml-1 mt-2 lg:mt-0 lg:ml-4 sm:w-full">
                {childLessonItem.comment}
              </div>
            )}
          </div>
        </td>
      </tr>
    );
  };

  // Get all lessons by nivo
  useEffect(() => {
    getLessons(0, 20, { nivo: child?.nivo });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isAdmin && (
        <div className="flex justify-end gap-3 mb-2">
          {isEditMode ? (
            <>
              <button
                className="flex bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 lg:px-3 xl:px-4 text-sm rounded align-middle items-center"
                onClick={saveChildLessons}
              >
                Save
              </button>
              <button
                className="flex border border-black px-3 py-2 text-center text-black hover:bg-opacity-90 lg:px-3 xl:px-4 text-sm rounded align-middle items-center"
                onClick={resetChildLessonsState}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="flex bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 lg:px-3 xl:px-4 text-sm rounded align-middle items-center"
              onClick={resetChildLessonsState}
            >
              Edit
            </button>
          )}
        </div>
      )}
      <table className="quickview-content text-sm">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{lessons?.map((lesson: ILesson) => lessonRow(lesson))}</tbody>
      </table>
    </div>
  );
};

export default LessonsPane;
