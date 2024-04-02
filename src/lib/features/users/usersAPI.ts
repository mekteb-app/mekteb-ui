import { baseApiCall } from "@/lib/baseApiCall";
import { IPagination } from "@/interfaces/IPagination";
import { IUser } from "@/interfaces/IUser";

interface IUsersResponse {
  data: IUser[];
  message: string;
  status: number;
  count: number;
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
