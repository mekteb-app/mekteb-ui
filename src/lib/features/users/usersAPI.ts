import { baseApiCall, baseApiCallBody } from "@/lib/baseApiCall";
import { IPagination } from "@/interfaces/IPagination";
import { IUser } from "@/interfaces/IUser";
import { IUserPayload } from "@/interfaces/IUserPayload";
import CustomError from "@/types/custom-error";
import { IUserOption } from "@/interfaces/IUserOption";

interface IUsersResponse {
  data: IUser[];
  message: string;
  status: number;
  count: number;
}

interface IUserOptionsResponse {
  data: IUserOption[];
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

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const fetchUserOptions = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/users/options`,
    "GET"
  );
  const result: IUserOptionsResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

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

  if (response.status !== 201) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const fetchUserDetails = async (id: string) => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/users/details/${id}`,
    "GET"
  );
  const result: IUserResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};

export const updateUser = async (id: string, data: IUserPayload) => {
  const response = await baseApiCallBody(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    "PUT",
    {},
    data
  );
  const result: IUserResponse = await response.json();

  if (response.status !== 200) {
    const customError = new CustomError(result.message, response.status);
    throw new Error(customError.stringify());
  }

  return result;
};
