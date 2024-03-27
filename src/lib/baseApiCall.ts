export const baseApiCall = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  headers: { [key: string]: string } = {},
  data: any = {}
) =>
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...headers,
    },
    body: JSON.stringify(data),
  });
