import { SESSION_TOKEN } from "@/constants";
import { clearCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem(SESSION_TOKEN);
    dispatch(clearCurrentUser());
    router.push(`/auth/signin`);
  };

  return [logout];
};

export default useAuth;
