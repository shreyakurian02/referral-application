import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ user, authenticationOption, setAuthenticationOption }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload =
      authenticationOption == "login"
        ? { user: { email, password } }
        : {
            user: {
              email,
              password,
              password_confirmation: passwordConfirmation,
            },
          };
    try {
      authenticationOption == "login"
        ? await axios.post(`/users/sign_in`, payload)
        : await axios.post(`/users`, payload);
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
    <div className="flex h-screen justify-center items-center bg-red-800">
      <div className="sm:max-w-md lg:w-1/2 xl:w-1/3 space-y-4">
        <Typography>LOGIN</Typography>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="flex flex-col space-y-3">
            <TextField
              required
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {authenticationOption === "signup" && (
              <TextField
                required
                label="Password Confirmation"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            )}
          </div>
          {authenticationOption === "signup" ? (
            <Button variant="contained" onClick={handleLogin}>
              Submit
            </Button>
          ) : (
            <>
              <div className="flex w-full justify-end">
                <Button variant="text">Forgot your Password?</Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="contained" onClick={handleLogin}>
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
      </div>
    </div>
  );
};

export default LoginForm;
