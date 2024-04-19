"use client";
import { ILoginPayload } from "@/interfaces/ILoginPayload";
import { useLoginMutation } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormItemError from "@/components/FormElements/FormItemError";
import { SESSION_TOKEN } from "@/constants";
import {
  selectCurrentUser,
  setCurrentUserAsync,
} from "@/lib/features/currentUser/currentUserSlice";
import useErrorHandling from "@/hooks/useErrorHandling";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setError } = useErrorHandling();

  const [login, { isLoading }] = useLoginMutation();

  const currentUser = useAppSelector(selectCurrentUser);

  const onSubmit = async (data: ILoginPayload) => {
    try {
      const { data: result } = await login(data).unwrap();

      // Set the access token to the local storage
      localStorage.setItem(SESSION_TOKEN, result?.accessToken ?? "");

      dispatch(setCurrentUserAsync(null));

      router.push("/"); // Redirect to the dashboard page.
    } catch (error: any) {
      const { data = {} } = error;
      setError(data);
    }
  };

  return (
    <>
      {/* <!-- Sign In Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <h4 className="text-center p-3 text-lg font-bold text-black">
            Login
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.email && (
                <FormItemError>Email is required.</FormItemError>
              )}
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.password && (
                <FormItemError>Please enter valid password.</FormItemError>
              )}
            </div>

            <div className="mb-5.5 mt-5 flex items-center justify-between">
              <label htmlFor="formCheckbox" className="flex cursor-pointer">
                <div className="relative pt-0.5">
                  <input
                    type="checkbox"
                    id="formCheckbox"
                    className="taskCheckbox sr-only"
                  />
                  <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                    <span className="text-white opacity-0">
                      <svg
                        className="fill-current"
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <p>Remember me</p>
              </label>

              <Link href="#" className="text-sm text-primary hover:underline">
                Forget password?
              </Link>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-secondary border-t-transparent mr-2"></div>
              ) : (
                <></>
              )}{" "}
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
