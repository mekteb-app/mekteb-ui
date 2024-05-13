"use client";
import React from "react";
import { useForgetPasswordMutation } from "@/lib/features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import FormItemError from "@/components/FormElements/FormItemError";
import useErrorHandling from "@/hooks/useErrorHandling";
import { toast } from "react-toastify";
import Link from "next/link";

const ForgetPasswordForm: React.FC = () => {
  const { setError } = useErrorHandling();
  const [forgetPassword, { isLoading, isSuccess }] =
    useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    if (isValid) {
      try {
        const { message } = await forgetPassword(data).unwrap();
        toast.success(message);
      } catch (error: any) {
        const { data = {} } = error;
        setError(data);
      }
    }
  };

  return (
    <>
      {/* <!-- Reset password form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <h4 className="text-center p-3 text-lg font-bold text-black">
            Reset password form
          </h4>
        </div>
        {isSuccess && !isLoading ? (
          <div className="p-6.5">
            <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-3 py-4 shadow-md">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                    fill="white"
                    stroke="white"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                  Forget password email sent
                </h5>
                <p className="text-base leading-relaxed text-body">
                  Check your inbox for the reset password link
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {errors.email && (
                <FormItemError>
                  <>{errors.email?.message || "Email is required"}</>
                </FormItemError>
              )}
            </div>

            <div className="mb-5.5 mt-5 flex items-center justify-end">
              <Link
                href="/auth/signin"
                className="text-sm text-primary hover:underline"
              >
                Return to login
              </Link>
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-secondary border-t-transparent mr-2"></div>
              ) : (
                <></>
              )}{" "}
              Send reset password link
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPasswordForm;
