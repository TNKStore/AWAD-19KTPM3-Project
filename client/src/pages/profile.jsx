/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getLocalStorage, saveLocalStorage } from "../utils/localStorage";

export default function ProfilePage() {
  const [isSuccess, setIsSuccess] = useState(true);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  // const user = useSelector((state) => state.user?.userInfo);
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  const updateProfile = async (data) => {
    const headers = {
      "x-access-token": token
    };

    const dataSent = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };

    const response = await axios
      .put(`${process.env.REACT_APP_DOMAIN}/user/update`, dataSent, { headers })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const handleUpdateProfile = async (data) => {
    const response = await updateProfile(data);

    if (response.status === 200) {
      saveLocalStorage("user", response.data.user);
      setShouldRefetch(!shouldRefetch);
    } else setIsSuccess(false);
  };

  useEffect(() => {
    setValue("email", user?.email);
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
  }, [shouldRefetch]);

  useEffect(() => {}, [shouldRefetch]);

  return (
    <Box>
      <form className="child" onSubmit={handleSubmit(handleUpdateProfile)}>
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
      </form>
    </Box>
  );
}
