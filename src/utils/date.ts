import { format } from "date-fns";

export const formatDate = (
  date: string | undefined,
  dateFormat: string = "dd/MM/yyyy HH:mm"
) => {
  if (!date) return "N/A";
  const currentDate = new Date(date);
  const formattedDate = format(currentDate, dateFormat);
  return formattedDate;
};
