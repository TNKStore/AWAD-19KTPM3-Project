/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormWithoutHookForm() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/", { state: { username: "Khue", password: "191201" } });
  };

  return (
    <Container sx={{ bgcolor: "lightblue", border: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="submit" />
      </form>
    </Container>
  );
}
