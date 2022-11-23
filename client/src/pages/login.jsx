import React from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function FormWithoutHookForm() {
  const { handleSubmit, reset, control } = useForm();
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/", { state: { username: "Khue", password: "191201" } });
  };

  return (
    <form>
      <Controller
        name="textValue"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value || ""}
            label="Text Value"
          />
        )}
      />
      <Button onClick={handleSubmit(onSubmit)} variant="outlined">
        Submit
      </Button>
      <Button onClick={() => reset()} variant="outlined">
        Reset
      </Button>
    </form>
  );
}
