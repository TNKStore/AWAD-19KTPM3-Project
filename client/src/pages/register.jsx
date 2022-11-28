/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    const dataSent = {
      email: data.email,
      firstName: data.username,
      password: data.password
    };

    const response = await axios
      .post("http://localhost:4000/signup", dataSent)
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) navigate("/login");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h3"
            component="div"
            align="center"
            sx={{ flexGrow: 1 }}
          >
            Register
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Email
          </Typography>
          <input {...register("email", { required: "Required" })} />
          {errors.email && <span>{errors.email.message}</span>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Username
          </Typography>
          <input {...register("username", { required: "Required" })} />
          {errors.username && <span>{errors.username.message}</span>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Password
          </Typography>
          <input
            {...register("password", {
              required: "Required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 character length"
              }
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Retyped Password
          </Typography>
          <input
            {...register("passwordRetyped", {
              required: "Required",
              validate: (value) =>
                value === watchPassword || "Password does not match"
            })}
          />
          {errors.passwordRetyped && (
            <span>{errors.passwordRetyped.message}</span>
          )}
          <input type="submit" />
        </form>
      </div>
    </Box>
  );
}
