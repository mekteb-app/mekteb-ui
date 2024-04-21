import { baseApiCall } from "@/lib/baseApiCall";
import { IPagination } from "@/interfaces/IPagination";
import CustomError from "@/types/custom-error";
import { IChild } from "@/interfaces/IChild";

interface IChildrenResponse {
  data: IChild[];
  message: string;
  status: number;
  count: number;
}

// A mock function to mimic making an async request for data
export const fetchChildren = async ({ page, count }: IPagination) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/children?page=${page}&count=${count}`,
    "GET"
  );
  const result: IChildrenResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
