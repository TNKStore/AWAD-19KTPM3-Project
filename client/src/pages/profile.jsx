/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getLocalStorage, saveLocalStorage } from "../utils/localStorage";

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();
  const navigate = useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(true);

  useEffect(() => {}, [shouldRefetch]);

  // const user = useSelector((state) => state.user?.userInfo);
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  setValue("email", user?.email);
  setValue("firstName", user?.firstName);
  setValue("lastName", user?.lastName);

  const onSubmit = async (data) => {
    const headers = {
      "x-access-token": token
    };

    const dataSent = {
      email: data.email,
      firstName: data.username,
      lastName: data.lastName
    };

    const response = await axios
      .put("http://localhost:4000/user/update", dataSent, { headers })
      .catch((error) => console.error("There was an error!", error));

    console.log(response.data);
    if (response.status === 200) {
      saveLocalStorage("user", response.data.user);
      setShouldRefetch(!shouldRefetch);
    }
  };

  return (
    <Box>
      <form className="child" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Email
        </Typography>
        <input readOnly {...register("email", { required: "Required" })} />
        {errors.email && <span>{errors.email.message}</span>}
        <Typography
          variant="h6"
          component="div"
          className="col"
          sx={{ flexGrow: 1 }}
        >
          First name
        </Typography>
        <input
          {...register("firstName", {
            required: "Required"
          })}
        />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <Typography
          variant="h6"
          component="div"
          className="col"
          sx={{ flexGrow: 1 }}
        >
          Last name
        </Typography>
        <input
          {...register("lastName", {
            required: "Required"
          })}
        />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <input type="submit" className="child" value="Save" />
      </form>
    </Box>
  );
}
