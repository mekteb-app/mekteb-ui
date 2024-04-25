import {
  resetError,
  selectChildren,
  selectChildrenCount,
  selectChildrenError,
  selectChildrenOptions,
  setChildrenAsync,
  setChildrenOptionsAsync,
} from "@/lib/features/children/childrenSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { IChild } from "@/interfaces/IChild";
import { IChildOption } from "@/interfaces/IChildOption";

const useChildren = (): {
  children: IChild[];
  childrenOptions: IChildOption[];
  count: number;
  getChildren: (page?: number) => Promise<void>;
  getChildrenOptions: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const children = useAppSelector(selectChildren) || [];
  const childrenOptions = useAppSelector(selectChildrenOptions) || [];
  const count = useAppSelector(selectChildrenCount) || 0;
  const error = useAppSelector(selectChildrenError);

  const getChildren = async (page: number = 0) => {
    try {
      await dispatch(setChildrenAsync(page));
    } catch (error) {
      setError(error as any);
    }
  };

  const getChildrenOptions = async () => {
    try {
      await dispatch(setChildrenOptionsAsync(null));
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

  return { children, childrenOptions, count, getChildren, getChildrenOptions };
};

export default useChildren;
