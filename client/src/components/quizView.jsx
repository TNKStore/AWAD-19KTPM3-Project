/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import axios from "axios";
import { getLocalStorage } from "../utils/localStorage";

export default function QuizView(props) {
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
    optionsClickable,
    callback
  } = props;
  const token = getLocalStorage("token");

  const handleFetchData = () => {
    setQuizID(slideID);

    setShouldRefetch(false);
  };

  const handleSubmitVote = async (id) => {
    await socket.emit("vote", {
      presentationId: presentationID,
      questions: slides,
      questionId: slideID,
      optionId: id
    });

    callback();
  };

  // use initially
  useEffect(() => {
    if (slideID !== -1 && shouldRefetch) {
      handleFetchData();
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
        width: "100%",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        overflowY: "auto",
        borderColor: "rgba(0, 0, 1, 0)",
        borderRight: 1,
        alignItems: "center"
      }}
    >
      <Typography
        variant="h5"
        component="div"
        align="center"
        sx={{ flexGrow: 1, paddingTop: "64px" }}
      >
        {question}
      </Typography>
      {options.map((item) => {
        return (
          <Button
            variant="outlined"
            justifycontent="center"
            sx={{ height: "64px", width: "80%", marginBottom: "32px" }}
            onClick={() => handleSubmitVote(item.id)}
            disabled={!optionsClickable}
          >
            {item.content}
          </Button>
        );
      })}
    </Box>
  );
}

QuizView.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape),
  presentationID: PropTypes.string,
  slides: PropTypes.array,
  slideID: PropTypes.number,
  position: PropTypes.number,
  question: PropTypes.string,
  options: PropTypes.array,
  optionsClickable: PropTypes.bool,
  callback: PropTypes.func
};

QuizView.defaultProps = {
  socket: null,
  presentationID: "",
  slides: [],
  slideID: -1,
  position: 0,
  question: "",
  options: [],
  optionsClickable: true,
  callback: () => {}
};
