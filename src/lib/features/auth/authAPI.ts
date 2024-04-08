import { IAuthUser } from "@/interfaces/IAuthUser";
import { ILoginPayload } from "@/interfaces/ILoginPayload";
import { baseApiCallBody } from "@/lib/baseApiCall";

interface IAuthUserResponse {
  data: IAuthUser;
  message?: string;
  status: number;
}

//
export const login = async (data: ILoginPayload) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    "POST",
    {},
    data
  );
  const result: IAuthUserResponse = await response.json();

  if (response.status !== 202) throw new Error(result.message);

  return result;
};
