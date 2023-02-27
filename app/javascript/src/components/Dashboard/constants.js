import { getFormattedDate } from "./utils";
import * as yup from "yup";

export const MONTHS = [
  "January, February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Auguest",
  "September",
  "October",
  "November",
  "Decemeber",
];

export const COLUMNS = [
  { field: "email", headerName: "Email", width: 500 },
  {
    field: "created_at",
    headerName: "Invited At",
    width: 200,
    valueGetter: (params) => getFormattedDate(params.row.created_at),
  },
];

export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const REFERRAL_FORM_VALIDATION_SCHEMA = yup.object({
  email: yup
    .string("Enter email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export const REFERRAL_FORM_INITIAL_VALUES = {
  email: "",
};
