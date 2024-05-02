import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import useErrorHandling from "./useErrorHandling";
import { IUserOption } from "@/interfaces/IUserOption";
import {
  resetError,
  selectUser,
  selectUserError,
  selectUserOptions,
  setUserDetailsAsync,
  setUserOptionsAsync,
} from "@/lib/features/users/usersSlice";
import { IUser } from "@/interfaces/IUser";

const useUsers = (): {
  userOptions: IUserOption[];
  user: IUser | any;
  getUserOptions: () => Promise<void>;
  getUserDetails: (id: string) => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();

  const error = useAppSelector(selectUserError);
  const userOptions = useAppSelector(selectUserOptions);
  const user = useAppSelector(selectUser) || {};

  const getUserDetails = async (id: string) => {
    try {
      await dispatch(setUserDetailsAsync(id));
    } catch (error) {
      setError(error as any);
    }
  };

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

  return { userOptions, user, getUserOptions, getUserDetails };
};

export default useUsers;
