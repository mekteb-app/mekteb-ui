import {
  removeChildAsync,
  resetChildState,
  resetError,
  selectChild,
  selectChildren,
  selectChildrenCount,
  selectChildrenError,
  selectChildrenOptions,
  selectChildrenWithLessons,
  setChildAsync,
  setChildrenAsync,
  setChildrenOptionsAsync,
  setChildrenWithLessonsAsync,
  updateChildLessonsAsync,
} from "@/lib/features/children/childrenSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { IChild, IChildWithLesson } from "@/interfaces/IChild";
import { IChildOption } from "@/interfaces/IChildOption";
import { IPagination } from "@/interfaces/IPagination";

const useChildren = (): {
  children: IChild[];
  child: IChild | undefined;
  childrenOptions: IChildOption[];
  childrenWithLessons: IChildWithLesson[];
  count: number;
  getChildren: (page?: number) => Promise<void>;
  getChildDetails: (id: string) => Promise<void>;
  removeChild: (id: string) => Promise<void>;
  getChildrenOptions: (data?: IPagination) => Promise<void>;
  resetChildDetails: () => void;
  updateChildLessons: (lessons: IChildLessonPayload[]) => Promise<void>;
  getChildrenWithLessons: (
    lessonId: string,
    data: IPagination
  ) => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const children = useAppSelector(selectChildren) || [];
  const child = useAppSelector(selectChild);
  const childrenOptions = useAppSelector(selectChildrenOptions) || [];
  const childrenWithLessons = useAppSelector(selectChildrenWithLessons) || [];
  const count = useAppSelector(selectChildrenCount) || 0;
  const error = useAppSelector(selectChildrenError);

  const getChildren = async (page: number = 0) => {
    try {
      await dispatch(setChildrenAsync(page));
    } catch (error) {
      setError(error as any);
    }
  };

  const getChildDetails = async (id: string) => {
    try {
      await dispatch(setChildAsync(id));
    } catch (error) {
      setError(error as any);
    }
  };

  const resetChildDetails = () => {
    try {
      dispatch(resetChildState());
    } catch (error) {
      setError(error as any);
    }
  };

  const getChildrenOptions = async (data?: IPagination) => {
    try {
      await dispatch(setChildrenOptionsAsync(data || {}));
    } catch (error) {
      setError(error as any);
    }
  };

  const removeChild = async (id: string) => {
    try {
      await dispatch(removeChildAsync(id));
    } catch (error) {
      setError(error as any);
    }
  };

  const updateChildLessons = async (lessons: IChildLessonPayload[]) => {
    try {
      await dispatch(updateChildLessonsAsync(lessons));
    } catch (error) {
      setError(error as any);
    }
  };

  const getChildrenWithLessons = async (
    lessonId: string,
    data: IPagination
  ) => {
    try {
      await dispatch(setChildrenWithLessonsAsync({ lessonId, data }));
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
    children,
    child,
    childrenOptions,
    childrenWithLessons,
    count,
    getChildren,
    getChildDetails,
    removeChild,
    getChildrenOptions,
    resetChildDetails,
    updateChildLessons,
    getChildrenWithLessons,
  };
};

export default useChildren;
