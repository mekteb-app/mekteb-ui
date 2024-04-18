import { SESSION_TOKEN } from "@/constants";
import { IError } from "@/interfaces/IError";
import {
  clearError,
  selectError,
  setError,
} from "@/lib/features/error/errorSlice";
import { useAppDispatch } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useErrorHandling = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    if (error) {
      const { status, message } = JSON.parse(error.message);
      if (status === 401) {
        // Handle 401 error
        localStorage.removeItem(SESSION_TOKEN);
        toast.error("Session expired, please login again");
        dispatch(clearError());
        return redirect(`/auth/signin`);
      }
      toast.error(message);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return {
    setError: (error: IError) => dispatch(setError(error)),
  };
};

export default useErrorHandling;
