import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IQuickview } from "@/interfaces/IQuickview";
import { Entity } from "@/enums/entity";
import {
  closeQuickviews,
  openQuickview,
  selectQuickviews,
} from "@/lib/features/quickview/quickviewSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import useErrorHandling from "./useErrorHandling";
import { IError } from "@/interfaces/IError";

const useQuickview = (): {
  quickviews: IQuickview[];
  onOpenQuickview: (entity: Entity, id: string) => Promise<void>;
  onCloseQuickViews: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const quickviews = useAppSelector(selectQuickviews);

  const onOpenQuickview = async (entity: Entity, id: string) => {
    try {
      dispatch(openQuickview({ entity, id }));
    } catch (error) {
      setError(error as IError);
    }
  };

  const onCloseQuickViews = async () => {
    try {
      dispatch(closeQuickviews());
    } catch (error) {
      setError(error as IError);
    }
  };

  return { quickviews, onOpenQuickview, onCloseQuickViews };
};

export default useQuickview;
