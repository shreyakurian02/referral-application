import { MONTHS } from "./constants";

export const getFormattedDate = (date) => {
  const dateString = new Date(date);
  return `${
    MONTHS[dateString.getMonth()]
  } ${dateString.getDate()}, ${dateString.getFullYear()}`;
};
