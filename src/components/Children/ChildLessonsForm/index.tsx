import React, { useCallback, useEffect, useMemo, useState } from "react";
import AppModal from "@/components/Modal";
import useLessons from "@/hooks/useLessons";
import { Nivo } from "@/enums/nivo";
import AppSelect from "@/components/FormElements/Select";
import { nivoOptions } from "@/constants";
import useChildren from "@/hooks/useChildren";
import { IChildLesson } from "@/interfaces/IChildLesson";
import { IChildWithLesson } from "@/interfaces/IChild";
import ChildLessonRow from "./child-lesson-row";

interface IChildrenLessonsFormProps {
  open: boolean;
  onClose: () => void;
}

const ChildrenLessonsForm: React.FC<IChildrenLessonsFormProps> = ({
  open,
  onClose,
}) => {
  const { lessonOptions, getLessonOptions } = useLessons();
  const { childrenWithLessons, getChildrenWithLessons, updateChildLessons } =
    useChildren();

  const [selectedNivo, setSelectedNivo] = useState<Nivo>();
  const [selectedLessonId, setSelectedLessonId] = useState<string>();
  const [changedLessons, setChangedLessons] = useState<IChildLessonPayload[]>(
    []
  );

  const lessonOptionValues = useMemo(
    () =>
      lessonOptions.map(({ id, title }) => ({
        value: id,
        label: `${title}`,
      })),
    [lessonOptions]
  );

  const isChanged = useMemo(
    () => !!selectedNivo && !!selectedLessonId && !!changedLessons.length,
    [changedLessons.length, selectedLessonId, selectedNivo]
  );

  const onSubmit = useCallback(
    () => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isChanged) {
        updateChildLessons(changedLessons);
        onClose();
      }
    },
    [changedLessons, isChanged, onClose, updateChildLessons]
  );

  const findChildLessonItem = useCallback(
    (child: IChildWithLesson): IChildLessonPayload => {
      const childLesson: IChildLesson = (child?.childLessons ?? [])[0];
      const changedChildLesson = changedLessons.find(
        (c) => c.id === childLesson?.id || c.childId === child.id
      );

      return {
        id: childLesson?.id,
        childId: child.id,
        lessonId: selectedLessonId ?? childLesson?.lesson?.id ?? "",
        comment: changedChildLesson?.comment ?? childLesson?.comment ?? "",
        passed: changedChildLesson?.passed ?? childLesson?.passed ?? false,
        attended:
          changedChildLesson?.attended ?? childLesson?.attended ?? false,
      };
    },
    [changedLessons, selectedLessonId]
  );

  const updateChildLesson = useCallback(
    (
      child: IChildWithLesson,
      childLesson: IChildLessonPayload,
      key: string,
      value: string | boolean
    ) => {
      if (selectedLessonId)
        setChangedLessons((prevLessons) => {
          const childLessonIndex = prevLessons.findIndex(
            (cl: IChildLessonPayload) =>
              cl.id === child.id || cl.childId === child.id
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
                lessonId: selectedLessonId,
                comment:
                  key === "comment"
                    ? (value as string)
                    : childLesson?.comment ?? "",
                passed:
                  key === "passed"
                    ? (value as boolean)
                    : childLesson?.passed ?? false,
                attended:
                  key === "attended"
                    ? (value as boolean)
                    : childLesson?.attended ?? false,
              },
            ];
            return updatedLessons;
          }
        });
    },
    [selectedLessonId]
  );

  // Fetch lessons options
  useEffect(() => {
    setSelectedLessonId("");
    if (selectedNivo) {
      getLessonOptions({
        nivo: selectedNivo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNivo]);

  // Fetch children lessons
  useEffect(() => {
    if (selectedNivo && selectedLessonId) {
      getChildrenWithLessons(selectedLessonId, {
        filters: { nivo: selectedNivo },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLessonId]);

  // Reset component state if `open` state changes
  useEffect(() => {
    if (open) {
      setSelectedLessonId("");
      setSelectedNivo(undefined);
      setChangedLessons([]);
    }
  }, [open]);

  return (
    <>
      <AppModal
        title="Add children lessons"
        open={open}
        onClose={() => {
          onClose();
        }}
        closeOnOverlayClick={false}
      >
        <div className="text-sm w-full lg:block">
          <form onSubmit={onSubmit}>
            <div className="p-3">
              {/* Nivo */}
              <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Nivo
                  </label>
                  <AppSelect
                    placeholder="Select nivo"
                    options={nivoOptions}
                    formatValue={(val) => +val}
                    value={
                      nivoOptions.find((nivo) => nivo.value === selectedNivo) ||
                      undefined
                    }
                    onChange={(value: string) =>
                      setSelectedNivo(value as unknown as Nivo)
                    }
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Lesson
                  </label>
                  <AppSelect
                    placeholder="Select lesson"
                    options={lessonOptionValues}
                    value={
                      selectedNivo
                        ? lessonOptionValues.find(
                            ({ value }) => value === selectedLessonId
                          )
                        : undefined
                    }
                    onChange={setSelectedLessonId}
                  />
                </div>
              </div>
              {/* Display children from the nivo */}
              {selectedLessonId && (
                <div>
                  <div className="flex mb-4.5 flex-col gap-6 lg:flex-row">
                    {childrenWithLessons.map((child, index) => (
                      <ChildLessonRow
                        key={child.id}
                        child={child}
                        childLessonItem={findChildLessonItem(child)}
                        index={index}
                        updateChildLesson={updateChildLesson}
                      />
                    ))}

                    {!childrenWithLessons.length &&
                      "No children for the selected nivo and lesson"}
                  </div>
                </div>
              )}
              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                disabled={!isChanged}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </AppModal>
    </>
  );
};

export default ChildrenLessonsForm;
