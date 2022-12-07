/* eslint-disable react/jsx-props-no-spreading */
import { Box, Typography } from "@mui/material";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

export default function QuizForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      test: [{ firstName: "" }]
    },
    mode: "onChange"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
    rules: {
      minLength: 4
    }
  });

  const handleUpdateQuiz = async (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        overflowY: "auto"
      }}
    >
      <form className="child" onSubmit={handleSubmit(handleUpdateQuiz)}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your question
        </Typography>
        <input {...register("question", { required: "Required" })} />
        {errors.question && <span>{errors.email.message}</span>}
        <Typography
          variant="h6"
          component="div"
          className="col"
          sx={{ flexGrow: 1 }}
        >
          Options
        </Typography>
        <div>
          {fields.map((item, index) => {
            return (
              <div display="flex" key={item.id}>
                <input
                  {...register(`test.${index}.firstName`, { required: true })}
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        <section>
          <button
            type="button"
            onClick={() => {
              append({ firstName: "" });
            }}
          >
            append
          </button>
        </section>
        <input type="submit" className="child" value="Save" />
      </form>
    </Box>
  );
}
