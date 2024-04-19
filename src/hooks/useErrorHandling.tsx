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

  const isValidJSON = (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (error) {
      let status, message;
      if (isValidJSON(error.message)) {
        const err = JSON.parse(error.message);
        status = err.status;
        message = err.message;
      } else {
        status = error.status;
        message = error.message;
      }

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
