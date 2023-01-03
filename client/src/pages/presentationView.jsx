/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getLocalStorage } from "../utils/localStorage";
import OptionsBarChart from "../components/barChart";
import QuizView from "../components/quizView";
import QuickChat from "../components/quickChat";

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

export const socketListener = async (
  socket,
  setSlides,
  setVoteHistory,
  setSlideValue
) => {
  socket.on("sendUpdatedQuestions", function (response) {
    setSlides([...response.questions]);
    setVoteHistory(response.historyVote);
  });

  socket.on("sendUpdatedSlidePosition", function (response) {
    setVoteHistory(response.historyVote);
    setSlideValue(parseInt(response.slidePosition, 10));
  });
};

export default function PresentationViewPage(props) {
  const [slides, setSlides] = useState([]);
  const [slideValue, setSlideValue] = useState(0);
  const [voteHistory, setVoteHistory] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [presentationStart, setPresentationStart] = useState(false);
  const [shouldShowResult, setShouldShowResult] = useState(false);
  const [optionsClickable, setOptionsClickable] = useState(true);
  const [presentationData, setPresentationData] = useState({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = getLocalStorage("token");
  const user = getLocalStorage("user");
  const presentationID = searchParams.get("id");

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
      const { slideList, historyVote, historyChat, questions } = response.data;
      setSlides(slideList);
      setVoteHistory(historyVote);
      setShouldRefetch(false);
      setPresentationData({ historyChat, questions });
    }
  };

  const handleSubmit = () => {
    // setOptionsClickable(false);
    // setShouldShowResult(true);
  };

  // Use effects

  useEffect(() => {
    if (presentationID !== null && shouldRefetch) {
      handleFetchSlides({});
    }
  }, [presentationID, shouldRefetch]);

  useEffect(() => {
    if (presentationID !== null && slides.length !== 0 && !presentationStart) {
      socket.emit("presentationStart", {
        presentationId: String(presentationID),
        questions: slides
      });
      socketListener(socket, setSlides, setVoteHistory, setSlideValue);
      setPresentationStart(true);
    }
  }, [slides]);

  useEffect(() => {
    if (presentationID != null && slides.length !== 0) {
      const itemHistory = voteHistory.findIndex(
        (item) =>
          item.email === user.email && item.slideId === slides[slideValue]?.id
      );
      if (itemHistory !== -1) {
        setOptionsClickable(false);
        setShouldShowResult(true);
      } else {
        setOptionsClickable(true);
        setShouldShowResult(false);
      }
    }
  }, [voteHistory, slideValue]);

  // Components
  function PresentationBar() {
    const handleBack = () => {
      navigate(-1);
    };

    return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "64px" }}
      >
        <Toolbar display="flex">
          <ArrowBackIcon onClick={handleBack} />
          <Box sx={{ width: 256 }} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <>
      <PresentationBar />
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
              callback={handleSubmit}
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
      <QuickChat
        msgData={presentationData.historyChat}
        presentationId={presentationID}
        questionData={presentationData.questions}
        isView
      />
    </>
  );
}

PresentationViewPage.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape)
};

PresentationViewPage.defaultProps = {
  socket: null
};
