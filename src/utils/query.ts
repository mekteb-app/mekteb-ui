export const generateQueryParams = (
  filters: { [key: string]: string } | undefined
) => {
  if (!filters) return "";

  let queryParams = "";

  const keys = Object.keys(filters);

  keys.map((key, index) => {
    queryParams += `${key}=${filters[key]}${keys.length - 1 === index ? "" : "&"}`;
  });

  return queryParams;
};
