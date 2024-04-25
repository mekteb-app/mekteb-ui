"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useVerifyUserMutation } from "@/lib/features/auth/authSlice";
import { IVerifyUser } from "@/interfaces/IVerifyUser";
import { SubmitHandler, useForm } from "react-hook-form";
import FormItemError from "@/components/FormElements/FormItemError";
import useErrorHandling from "@/hooks/useErrorHandling";
import { toast } from "react-toastify";

const VerifyAccountForm: React.FC = () => {
  const routeParams = useParams();
  const router = useRouter();
  const { setError } = useErrorHandling();
  const [verifyUser, { isLoading, isSuccess }] = useVerifyUserMutation();

  const token = routeParams.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IVerifyUser>();

  const onSubmit: SubmitHandler<IVerifyUser> = async (data) => {
    if (isValid) {
      try {
        const { message } = await verifyUser({ ...data, token }).unwrap();
        toast.success(message);
      } catch (error: any) {
        const { data = {} } = error;
        setError(data);
      }
    }
  };

  // Watch the confirmPassword field to trigger validation
  const watchConfirmPassword = watch("password", "");

  useEffect(() => {
    if (isSuccess && !isLoading) {
      router.push("/auth/signin"); // Redirect to the login page.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {/* <!-- Verify Account Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <h4 className="text-center p-3 text-lg font-bold text-black">
            Verify Account
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6.5">
            <div className="mb-4.5">
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
                <FormItemError>
                  <>{errors.password.message || "Password is required"}</>
                </FormItemError>
              )}
            </div>

            <div className="mb-5.5 mt-5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watchConfirmPassword || "Passwords do not match",
                })}
                type="password"
                placeholder="Re-type password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />

              {errors.confirmPassword && (
                <FormItemError>
                  <>
                    {errors.confirmPassword.message ||
                      "Confirmation password is required"}
                  </>
                </FormItemError>
              )}
            </div>

            <button
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Verify Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyAccountForm;
