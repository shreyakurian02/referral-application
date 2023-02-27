import * as yup from "yup";

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object({
  email: yup
    .string("Enter email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  passwordConfirmation: yup.mixed().when("authenticationOption", {
    is: (value) => value === "signup",
    then: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  }),
});

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
  passwordConfirmation: "",
  authenticationOption: "",
};
