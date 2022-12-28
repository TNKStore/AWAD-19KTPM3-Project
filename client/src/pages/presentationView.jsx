/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import axios from "axios";
import { useLocation } from "react-router";
import { getLocalStorage } from "../utils/localStorage";
import OptionsBarChart from "../components/barChart";
import QuizView from "../components/quizView";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          width="100%"
          height="calc(100vh - 64px)"
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number
};

export default function PresentationViewPage(props) {
  const [presentationID, setPresentationID] = useState(null);
  const [slides, setSlides] = useState([]);
  const [slideValue, setSlideValue] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [shouldShowResult, setShouldShowResult] = useState(false);
  const [optionsClickable, setOptionsClickable] = useState(true);

  const location = useLocation();
  const token = getLocalStorage("token");
  const { socket } = props;

  // API calls

  const fetchSlides = async () => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .get(
        `${process.env.REACT_APP_DOMAIN}/slide/list?presentationId=${presentationID}`,
        {
          headers
        }
      )
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchSlides = async () => {
    const response = await fetchSlides();

    if (response.status === 200) {
      const data = response.data.slideList;
      setSlides(data);
      setShouldRefetch(false);
    }
  };

  const handleChangeSlide = () => {
    if (slideValue < slides.length - 1) {
      setSlideValue(slideValue + 1);
      setShouldRefetch(true);
    }
  };

  const socketListener = async () => {
    socket.on("sendUpdatedQuestions", function (response) {
      setSlides(response.questions);
      setOptionsClickable(false);
      setShouldShowResult(true);
    });
  };

  // Use effects

  useEffect(() => {
    if (location.state !== null) {
      setPresentationID(location.state.presentationID);
    }
  }, [presentationID]);

  useEffect(() => {
    if (presentationID !== null && shouldRefetch) {
      handleFetchSlides({});
    }
  }, [presentationID, shouldRefetch]);

  useEffect(() => {
    if (presentationID !== null && slides !== []) {
      socket.emit("presentationStart", {
        presentationId: presentationID,
        questions: slides
      });
    }
  }, [slides]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 64px)",
        alignItems: "start",
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 64px)",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <TabPanel value={slideValue} index={slides[slideValue]?.position}>
          <QuizView
            socket={socket}
            presentationID={presentationID}
            slides={slides}
            slideID={slides[slideValue]?.id}
            position={slides[slideValue]?.position}
            question={slides[slideValue]?.question}
            options={slides[slideValue]?.options}
            optionsClickable={optionsClickable}
            callback={socketListener}
          />
          <OptionsBarChart
            padding={64}
            question={slides[slideValue]?.question}
            options={slides[slideValue]?.options}
            shouldShowResult={shouldShowResult}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

PresentationViewPage.propTypes = {
  socket: PropTypes.shape
};

PresentationViewPage.defaultProps = {
  socket: {}
};
