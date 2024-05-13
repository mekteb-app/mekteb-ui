import {
  removeChildAsync,
  resetChildState,
  resetError,
  selectChild,
  selectChildren,
  selectChildrenCount,
  selectChildrenError,
  selectChildrenOptions,
  setChildAsync,
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
  child: IChild | any;
  childrenOptions: IChildOption[];
  count: number;
  getChildren: (page?: number) => Promise<void>;
  getChildDetails: (id: string) => Promise<void>;
  removeChild: (id: string) => Promise<void>;
  getChildrenOptions: () => Promise<void>;
  resetChildDetails: () => void;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const children = useAppSelector(selectChildren) || [];
  const child = useAppSelector(selectChild);
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

  const getChildrenOptions = async () => {
    try {
      await dispatch(setChildrenOptionsAsync(null));
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
    count,
    getChildren,
    getChildDetails,
    removeChild,
    getChildrenOptions,
    resetChildDetails,
  };
};

export default useChildren;
