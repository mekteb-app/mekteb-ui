import { baseApiCall, baseApiCallBody } from "@/lib/baseApiCall";
import { IPagination } from "@/interfaces/IPagination";
import { IUser } from "@/interfaces/IUser";
import { IUserPayload } from "@/interfaces/IUserPayload";

interface IUsersResponse {
  data: IUser[];
  message: string;
  status: number;
  count: number;
}

interface IUserResponse {
  data: IUser;
  message: string;
  status: number;
}

// A mock function to mimic making an async request for data
export const fetchUsers = async ({ page, count }: IPagination) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&count=${count}`,
    "GET"
  );
  const result: IUsersResponse = await response.json();

  return result;
};

export const createUser = async (data: IUserPayload) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    "POST",
    {},
    data
  );
  const result: IUserResponse = await response.json();

  if (response.status !== 201) throw new Error(result.message);

  return result;
};
