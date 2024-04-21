import {
  resetError,
  selectChildren,
  selectChildrenCount,
  selectChildrenError,
  setChildrenAsync,
} from "@/lib/features/children/childrenSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { IChild } from "@/interfaces/IChild";

const useChildren = (): [
  IChild[],
  number,
  (page?: number) => Promise<void>,
] => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const children = useAppSelector(selectChildren) || [];
  const count = useAppSelector(selectChildrenCount) || 0;
  const error = useAppSelector(selectChildrenError);

  const getChildren = async (page: number = 0) => {
    try {
      await dispatch(setChildrenAsync(page));
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

  return [children, count, getChildren];
};

export default useChildren;
