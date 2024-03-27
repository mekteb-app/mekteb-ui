import { IAuthUser } from "@/interfaces/IAuthUser";
import { ILoginPayload } from "@/interfaces/ILoginPayload";
import { baseApiCall } from "@/lib/baseApiCall";

//
export const login = async (data: ILoginPayload) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    "POST",
    {},
    data
  );
  const result: IAuthUser = await response.json();

  return result;
};
