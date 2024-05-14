import { baseApiCall } from "@/lib/baseApiCall";
import CustomError from "@/types/custom-error";
import { ICommunity } from "@/interfaces/ICommunity";
import { IPagination } from "@/interfaces/IPagination";
import { ICommunityOption } from "@/interfaces/ICommunityOption";

interface ICommunityResponse {
  data: ICommunity[];
  message: string;
  status: number;
  count: number;
}

interface ICommunityOptionsResponse {
  data: ICommunityOption[];
  message: string;
  status: number;
}

// A mock function to mimic making an async request for data
export const fetchCommunities = async ({ page, count }: IPagination) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/community?page=${page}&count=${count}`,
    "GET"
  );
  const result: ICommunityResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

// A mock function to mimic making an async request for data
export const fetchCommunityOptions = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/community/options`,
    "GET"
  );
  const result: ICommunityOptionsResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
