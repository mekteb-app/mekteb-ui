import { baseApiCall } from "@/lib/baseApiCall";
import CustomError from "@/types/custom-error";
import { ICommunity } from "@/interfaces/ICommunity";

interface ICommunityResponse {
  data: ICommunity[];
  message: string;
  status: number;
  count: number;
}

// A mock function to mimic making an async request for data
export const fetchCommunityOptions = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/community/options`,
    "GET"
  );
  const result: ICommunityResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
