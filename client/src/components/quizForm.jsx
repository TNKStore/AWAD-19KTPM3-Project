/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
    callback,
    viewResult
  } = props;
  const token = getLocalStorage("token");
  const navigate = useNavigate();

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

  // Temp
  const submitData = async () => {
    navigate(`/presentations/view?id=${presentationID}`);
  };

  const handleViewResult = async () => {
    viewResult();
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
        width: "70%",
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
        <input
          type="textarea"
          {...register("question", { required: "Required" })}
        />
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
                  {...register(`options.${index}.content`, {
                    required: "Required"
                  })}
                />
                {errors.options?.[index]?.content && (
                  <span className="error">
                    {errors.options?.[index]?.content.message}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <input type="submit" className="child" value="Save" />
      </form>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "end",
          border: 0
        }}
      >
        <Button
          variant="outlined"
          size="large"
          color="success"
          sx={{ margin: 3, marginTop: 13 }}
          onClick={handleViewResult}
        >
          View Result
        </Button>
      </Box>
    </Box>
  );
}

QuizForm.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape),
  presentationID: PropTypes.number,
  slides: PropTypes.array,
  slideID: PropTypes.number,
  position: PropTypes.number,
  question: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func,
  viewResult: PropTypes.func
};

QuizForm.defaultProps = {
  socket: null,
  presentationID: 0,
  slides: [],
  slideID: -1,
  position: 0,
  question: "",
  options: [],
  callback: () => {},
  viewResult: () => {}
};
