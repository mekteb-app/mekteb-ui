import { format } from "date-fns";

export const formatDate = (
  date: string,
  dateFormat: string = "dd/MM/yyyy HH:mm"
) => {
  const currentDate = new Date(date);
  const formattedDate = format(currentDate, dateFormat);
  return formattedDate;
};
