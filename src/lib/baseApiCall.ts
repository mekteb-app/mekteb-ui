import { SESSION_TOKEN } from "@/constants";

export const baseApiCall = async (
  url: string,
  method: "GET" | "DELETE",
  headers: { [key: string]: string } = {},
  data: any = {}
) =>
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(SESSION_TOKEN)}`,
      ...headers,
    },
  });

export const baseApiCallBody = async (
  url: string,
  method: "POST" | "PUT" | "PATCH",
  headers: { [key: string]: string } = {},
  data: any = {}
) =>
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(SESSION_TOKEN)}`,
      ...headers,
    },
    body: JSON.stringify(data),
  });
