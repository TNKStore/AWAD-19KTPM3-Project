/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveUser } from "../features/user/userSlice";
import useFetch from "../hooks/useFetch";

export default function LoginPage() {
  const [isSuccess, setIsSuccess] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleGoogle, loading, error } = useFetch(
    `${process.env.REACT_APP_DOMAIN}/login-google`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill"
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const login = async (data) => {
    const dataSent = {
      email: data.email,
      password: data.password
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/login`, dataSent)
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const handleLogin = async (data) => {
    const response = await login(data);

    if (
      response?.data?.token &&
      response?.data?.user &&
      response?.status === 200
    ) {
      dispatch(saveUser(response?.data));
      navigate("/", { state: response.data });
    } else setIsSuccess(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            Login
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Username
          </Typography>
          <input {...register("email", { required: "Required" })} />
          {errors.email && <span>{errors.email.message}</span>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Password
          </Typography>
          <input
            type="password"
            {...register("password", { required: "Required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input type="submit" />
          {!isSuccess && (
            <Typography
              variant="h8"
              component="div"
              color="red"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Login failed - Please check your input again
            </Typography>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              margin: 20
            }}
          >
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading ? (
              <div>Loading....</div>
            ) : (
              <div id="signUpDiv" data-text="signup_with" />
            )}
          </div>
          <div className="row">
            <Typography variant="h7" sx={{ flexGrow: 1 }}>
              If you do not have an account,
            </Typography>
            <span> </span>
            <Link variant="h7" to="/register">
              click here
            </Link>
          </div>
        </form>
      </div>
    </Box>
  );
}
