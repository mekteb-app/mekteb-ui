import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthUser } from "@/interfaces/IAuthUser";
import { ILoginPayload } from "@/interfaces/ILoginPayload";

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
  }),
});

// Exporting the `login` endpoint directly
export const { useLoginMutation } = authApiSlice;
