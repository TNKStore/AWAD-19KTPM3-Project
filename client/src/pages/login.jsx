/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveUser } from "../features/user/userSlice";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    const dataSent = {
      email: data.email,
      password: data.password
    };

    const response = await axios
      .post("http://localhost:4000/login", dataSent)
      .catch((error) => console.error("There was an error!", error));

    if(response.data?.token && response.data?.user) {
      dispatch(saveUser(response?.data))
      navigate("/", { state: response.data });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems:'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{maxWidth: "600px", width: '100%'}}>
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
          <input {...register("email", { required: "Required" })} />
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
      </div>
    </Box>
  );
}
