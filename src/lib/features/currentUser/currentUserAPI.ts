import { baseApiCall } from "@/lib/baseApiCall";

// A function to get current user details
export const getCurrentUser = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/whoami`,
    "GET"
  );

  const result = await response.json();

  return result;
};
