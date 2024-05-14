import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { ICommunity } from "@/interfaces/ICommunity";
import {
  resetError,
  selectCommunities,
  selectCommunityError,
  selectCommunityOptions,
  setCommunitiesAsync,
  setCommunityOptionsAsync,
  selectCommunitiesCount,
} from "@/lib/features/community/communitySlice";
import { ICommunityOption } from "@/interfaces/ICommunityOption";

const useCommunity = (): {
  communities: ICommunity[];
  options: ICommunityOption[];
  count: number;
  getCommunities: (page?: number) => Promise<void>;
  getCommunityOptions: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const communities = useAppSelector(selectCommunities) || [];
  const communityOptions = useAppSelector(selectCommunityOptions) || [];
  const count = useAppSelector(selectCommunitiesCount) || 0;
  const error = useAppSelector(selectCommunityError);

  const getCommunityOptions = async () => {
    try {
      await dispatch(setCommunityOptionsAsync(null));
    } catch (error) {
      setError(error as any);
    }
  };

  const getCommunities = async (page = 1) => {
    try {
      await dispatch(setCommunitiesAsync(page));
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
    communities,
    options: communityOptions,
    count,
    getCommunities,
    getCommunityOptions,
  };
};

export default useCommunity;
