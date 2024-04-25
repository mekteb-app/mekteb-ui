import { SESSION_TOKEN } from "@/constants";
import { resetChildrenState } from "@/lib/features/children/childrenSlice";
import { resetCommunityState } from "@/lib/features/community/communitySlice";
import { clearCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { clearError } from "@/lib/features/error/errorSlice";
import { resetUsersState } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem(SESSION_TOKEN);
    dispatch(clearCurrentUser());
    dispatch(resetChildrenState());
    dispatch(resetCommunityState());
    dispatch(resetUsersState());
    dispatch(clearError());
    return router.push(`/auth/signin`);
  };

  return [logout];
};

export default useAuth;
