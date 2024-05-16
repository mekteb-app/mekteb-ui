import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { ILesson } from "@/interfaces/ILesson";
import {
  resetError,
  selectLessonError,
  selectLessons,
  selectLessonsCount,
  setLessonsAsync,
} from "@/lib/features/lessons/lessonsSlice";

const useLessons = (): {
  lessons: ILesson[];
  count: number;
  getLessons: (page?: number) => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const lessons = useAppSelector(selectLessons) || [];
  const count = useAppSelector(selectLessonsCount) || 0;
  const error = useAppSelector(selectLessonError);

  const getLessons = async (page = 1) => {
    try {
      await dispatch(setLessonsAsync(page));
    } catch (error) {
      setError(error as any);
    }
  };

  useEffect(() => {
    if (error) {
      setError(error);
    }

    dispatch(resetError());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    lessons,
    count,
    getLessons,
  };
};

export default useLessons;
