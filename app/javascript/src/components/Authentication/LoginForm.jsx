import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  LOGIN_FORM_VALIDATION_SCHEMA,
  LOGIN_FORM_INITIAL_VALUES,
} from "./constants";
import { authentication } from "../../apis/authentication";

const LoginForm = ({ user, authenticationOption, setAuthenticationOption }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { ...LOGIN_FORM_INITIAL_VALUES, authenticationOption },
    validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    onSubmit: () => handleLogin(),
  });

  useEffect(() => {
    formik.setFieldValue("authenticationOption", authenticationOption);
  }, [authenticationOption]);

  const handleLogin = async () => {
    const { email, password, passwordConfirmation } = formik.values;
    const payload = {
      user: {
        email,
        password,
      },
    };
    try {
      authenticationOption == "login"
        ? await authentication.login(payload)
        : await authentication.signUp({
            user: {
              ...payload.user,
              password_confirmation: passwordConfirmation,
            },
          });
      localStorage.setItem("user", email);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div className="flex h-screen justify-center items-center border border-red-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="sm:max-w-md lg:w-1/2 xl:w-1/3 space-y-4">
        <Box
          sx={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold" }}
            fontWeight="medium"
            color="#1976d2"
            display="flex"
            justifyContent="center"
          >
            {authenticationOption === "signup" ? "SIGN UP" : "LOGIN"}
          </Typography>
          <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
            <div className="flex flex-col space-y-3">
              <TextField
                required
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                required
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {authenticationOption === "signup" && (
                <TextField
                  required
                  label="Password Confirmation"
                  name="passwordConfirmation"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passwordConfirmation &&
                    Boolean(formik.errors.passwordConfirmation)
                  }
                  helperText={
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                  }
                />
              )}
            </div>
            {authenticationOption === "signup" ? (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            ) : (
              <>
                <div className="flex w-full justify-end">
                  <Button variant="text">Forgot your Password?</Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setAuthenticationOption("signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            )}
          </form>
        </Box>
      </div>
    </div>
  );
};

export default LoginForm;
