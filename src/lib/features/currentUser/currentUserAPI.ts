import { baseApiCall } from "@/lib/baseApiCall";

// A function to get current user details
export const getCurrentUser = async () => {
  const response = await baseApiCall(
    `${process.env.NEXT_PUBLIC_API_URL}/current-user`,
    "GET"
  );

  const result = await response.json();

  if (response.status !== 200) throw new Error(result.message);

  return result;
};
