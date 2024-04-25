import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { IUserOption } from "@/interfaces/IUserOption";
import {
  resetError,
  selectUserError,
  selectUserOptions,
  setUserOptionsAsync,
} from "@/lib/features/users/usersSlice";

const useUsers = (): [IUserOption[], () => Promise<void>] => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const error = useAppSelector(selectUserError);
  const userOptions = useAppSelector(selectUserOptions);

  const getUserOptions = async () => {
    try {
      await dispatch(setUserOptionsAsync(null));
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

  return [userOptions, getUserOptions];
};

export default useUsers;
