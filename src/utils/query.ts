export const generateQueryParams = (
  filters: { [key: string]: string } | undefined
) => {
  if (!filters) return "";

  let queryParams = "";

  Object.keys(filters).map((key) => {
    queryParams += `${key}=${filters[key]}&`;
  });

  return queryParams;
};
