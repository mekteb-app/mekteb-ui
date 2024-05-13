import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthUser } from "@/interfaces/IAuthUser";
import { ILoginPayload } from "@/interfaces/ILoginPayload";
import { IVerifyUser } from "@/interfaces/IVerifyUser";
import { IResetPassword } from "@/interfaces/IResetPassword";

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  }),
  reducerPath: "authApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    // Supply generics for the return type (in this case `QuotesApiResponse`)
    // and the expected query argument. If there is no argument, use `void`
    // for the argument type instead.
    login: build.mutation<{ data: IAuthUser; status: number }, ILoginPayload>({
      query: (loginCredentials) => ({
        url: "/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
    verifyUser: build.mutation<
      { message: string; status: number },
      IVerifyUser
    >({
      query: (verifyCredentials) => ({
        url: "/verify-user",
        method: "POST",
        body: verifyCredentials,
      }),
    }),
    forgetPassword: build.mutation<
      { message: string; status: number },
      { email: string }
    >({
      query: (emailBody) => ({
        url: "/forget-password",
        method: "POST",
        body: emailBody,
      }),
    }),
    resetPassword: build.mutation<
      { message: string; status: number },
      IResetPassword
    >({
      query: (resetPasswordCredentials) => ({
        url: "/reset-password",
        method: "POST",
        body: resetPasswordCredentials,
      }),
    }),
  }),
});

// Exporting the `login` endpoint directly
export const {
  useLoginMutation,
  useVerifyUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
