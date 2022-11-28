/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = React.useState(null);
  useEffect(() => {
    if (location.state !== null) {
      setUser(location.state);
      setValue("email", user?.email);
      setValue("username", user?.firstName);
    }
  }, [user]);

  const onSubmit = async (data) => {
    const dataSent = {
      email: data.email,
      firstName: data.username
    };

    const response = await axios
      .post("http://localhost:4000/signup", dataSent)
      .catch((error) => console.error("There was an error!", error));

    if (response.status === 200) navigate("/login");
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
          User Info
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Email
        </Typography>
        <input {...register("email", { required: "Required" })} />
        {errors.email && <span>{errors.email.message}</span>}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Username
        </Typography>
        <input
          {...register("username", {
            required: "Required"
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        <input type="submit" />
      </form>
    </Box>
  );
}
