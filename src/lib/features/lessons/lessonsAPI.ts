import { baseApiCall } from "@/lib/baseApiCall";
import CustomError from "@/types/custom-error";
import { ILesson } from "@/interfaces/ILesson";
import { IPagination } from "@/interfaces/IPagination";

interface ILessonResponse {
  data: ILesson[];
  message: string;
  status: number;
  count: number;
}

// A mock function to mimic making an async request for data
export const fetchLessons = async ({ page, count }: IPagination) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/lesson?page=${page}&count=${count}`,
    "GET"
  );
  const result: ILessonResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
