import { baseApiCall, baseApiCallBody } from "@/lib/baseApiCall";
import { IPagination } from "@/interfaces/IPagination";
import CustomError from "@/types/custom-error";
import { IChild } from "@/interfaces/IChild";
import { IChildPayload } from "@/interfaces/IChildPayload";
import { IChildOption } from "@/interfaces/IChildOption";
import { IChildLesson } from "@/interfaces/IChildLesson";

interface IChildrenResponse {
  data: IChild[];
  message: string;
  status: number;
  count: number;
}

interface IChildrenOptionsResponse {
  data: IChildOption[];
  message: string;
  status: number;
}

interface IChildResponse {
  data: IChild;
  message: string;
  status: number;
}

interface IChildResponse {
  data: IChild;
  message: string;
  status: number;
}

interface IChildLessonsResponse {
  data: IChildLesson[];
  message: string;
  status: number;
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

export const getChild = async (id: string) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/children/details/${id}`,
    "GET"
  );
  const result: IChildResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const createChild = async (data: IChildPayload) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/children`,
    "POST",
    {},
    data
  );
  const result: IChildResponse = await response.json();

  if (response.status !== 201) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const fetchChildrenOptions = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/children/options`,
    "GET"
  );
  const result: IChildrenOptionsResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const updateChild = async (id: string, data: IChildPayload) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/children/${id}`,
    "PUT",
    {},
    data
  );
  const result: IChildResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const removeChild = async (id: string) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/children/${id}`,
    "DELETE",
    {}
  );
  const result: IChildResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const updateChildLessons = async (data: {
  lessons: IChildLessonPayload[];
}) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/child-lesson`,
    "POST",
    {},
    data
  );
  const result: IChildLessonsResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
