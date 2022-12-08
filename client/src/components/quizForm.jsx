/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";

export default function QuizForm(props) {
  const { question, options } = props;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      test: [{ firstName: "" }]
    },
    mode: "onChange"
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "options",
    rules: {
      minLength: 4
    }
  });

  console.log("qusetion", question);

  setValue("question", question);
  options?.forEach((value, index) => {
    update(index, { content: value.content });
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
                  {...register(`options.${index}.content`, { required: true })}
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

QuizForm.propTypes = {
  question: PropTypes.string,
  options: PropTypes.array
};

QuizForm.defaultProps = {
  question: "",
  options: []
};
