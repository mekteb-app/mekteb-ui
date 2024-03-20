import { baseApiCall } from "@/lib/baseApiCall";
import { IUser } from "./usersSlice";

// A mock function to mimic making an async request for data
export const fetchUsers = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    "GET"
  );
  const result: IUser[] = await response.json();

  return result;
};
