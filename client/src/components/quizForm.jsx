/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

export default function QuizForm(props) {
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [quizID, setQuizID] = useState(-1);

  const {
    socket,
    presentationID,
    slides,
    slideID,
    position,
    question,
    options,
    callback
  } = props;
  const token = getLocalStorage("token");

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
    name: "options"
  });

  const updateQuestion = async (data) => {
    const headers = {
      "x-access-token": token
    };

    const dataSent = {
      presentationId: presentationID,
      slideId: slideID,
      position,
      question: data.question
    };

    console.log(dataSent);

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/slide/update`, dataSent, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const updateOptions = async (data) => {
    const headers = {
      "x-access-token": token
    };

    const sentOptions = options;
    sentOptions.forEach((value, index) => {
      value.content = data.options[index].content;
    });

    const dataSent = {
      slideId: slideID,
      optionList: sentOptions
    };

    console.log(dataSent);

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/slide/update-option`, dataSent, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const handleFetchData = () => {
    setQuizID(slideID);

    setValue("question", question);
    options?.forEach((value, index) => {
      update(index, { content: value.content });
    });

    setShouldRefetch(false);
  };

  const handleUpdateQuiz = async (data) => {
    const responseQuestion = await updateQuestion(data);
    const responseOptions = await updateOptions(data);

    if (responseQuestion.status === 200 && responseOptions.status === 200) {
      callback();
    }
  };

  const submitData = async () => {
    await socket.emit("presentationStart", slides);
  };

  const submitVote = async () => {
    await socket.emit("vote", {
      questionId: 4,
      optionId: options[0].id
    });
  };

  // use initially
  useEffect(() => {
    if (slideID !== -1 && shouldRefetch) {
      handleFetchData();
      console.log("refetch");
    }
  }, [shouldRefetch, slideID]);

  // use to detect tab change
  useEffect(() => {
    if (slideID !== quizID) {
      setShouldRefetch(true);
    }
  }, [slideID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        overflowY: "auto",
        borderColor: "rgba(0, 0, 0, 0.12)",
        borderLeft: 1
      }}
    >
      <form className="child" onSubmit={handleSubmit(handleUpdateQuiz)}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your question
        </Typography>
        <input {...register("question", { required: "Required" })} />
        {errors.question && <span>{errors.question.message}</span>}
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
              append({ content: "" });
            }}
          >
            append
          </button>
        </section>
        <input type="submit" className="child" value="Save" />
        <input
          type="button"
          className="child"
          value="Submit"
          onClick={submitData}
        />
        <input
          type="button"
          className="child"
          value="Submit"
          onClick={submitVote}
        />
      </form>
    </Box>
  );
}

QuizForm.propTypes = {
  socket: PropTypes.shape,
  presentationID: PropTypes.number,
  slides: PropTypes.array,
  slideID: PropTypes.number,
  position: PropTypes.number,
  question: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func
};

QuizForm.defaultProps = {
  socket: {},
  presentationID: 0,
  slides: [],
  slideID: -1,
  position: 0,
  question: "",
  options: [],
  callback: () => {}
};
