import { format, differenceInDays } from "date-fns";

const formatContestDateRange = (
  startDateISO: Date,
  endDateISO: Date,
): string => {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);

  const formattedStartDate = format(startDate, "d MMMM");
  const formattedEndDate = format(endDate, "d MMMM");
  const daysDifference = differenceInDays(endDate, startDate);

  return `${formattedStartDate} - ${formattedEndDate} (${daysDifference} days)`;
};

export default formatContestDateRange;
