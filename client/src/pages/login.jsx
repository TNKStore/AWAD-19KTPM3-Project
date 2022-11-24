/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    navigate("/", { state: data });
  };

  return (
    <Box sx={{ maxWidth: "xs" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input {...register("username", { required: "Required" })} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Password
        </Typography>
        <input {...register("password", { required: "Required" })} />
        <input type="submit" />
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
    </Box>
  );
}
