/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    navigate("/", { state: data });
  };

  const watchPassword = watch("password");

  return (
    <Box sx={{ maxWidth: "xs" }}>
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
    </Box>
  );
}
