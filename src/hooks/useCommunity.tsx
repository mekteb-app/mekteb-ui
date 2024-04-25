import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { ICommunity } from "@/interfaces/ICommunity";
import {
  resetError,
  selectCommunityError,
  selectCommunityOptions,
  setCommunityOptionsAsync,
} from "@/lib/features/community/communitySlice";

const useCommunity = (): {
  options: ICommunity[];
  getCommunityOptions: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const communityOptions = useAppSelector(selectCommunityOptions) || [];
  const error = useAppSelector(selectCommunityError);

  const getCommunityOptions = async () => {
    try {
      await dispatch(setCommunityOptionsAsync(null));
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

  return { options: communityOptions, getCommunityOptions };
};

export default useCommunity;
