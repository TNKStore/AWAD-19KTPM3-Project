/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Close, PostAdd } from "@mui/icons-material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getLocalStorage } from "../utils/localStorage";
import OptionsBarChart from "../components/barChart";
import QuizForm from "../components/quizForm";
import { socketListener } from "./presentationView";
import QuickChat from "../components/quickChat";
import ResultList from "../components/resultView";
import ErrorView from "../components/errorView";

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
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function PresentationDetailPage(props) {
  const [presentationID, setPresentationID] = useState(null);
  const [slides, setSlides] = useState([]);
  const [voteHistory, setVoteHistory] = useState([]);
  const [slideValue, setSlideValue] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [presentationStart, setPresentationStart] = useState(false);
  const [presentationData, setPresentationData] = useState({});
  const [isPresenting, setIsPresenting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isErrorViewShow, setIsErrorViewShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const token = getLocalStorage("token");
  const { socket } = props;

  console.log(voteHistory);

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

  const createSlide = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      presentationId: presentationID,
      position: slides[slides.length - 1].position + 1
    };

    const response = await axios
      .post(`${process.env.REACT_APP_DOMAIN}/slide/create`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  const deleteSlide = async (id) => {
    const headers = {
      "x-access-token": token
    };

    const response = await axios
      .delete(
        `${process.env.REACT_APP_DOMAIN}/presentation/${presentationID}/slide/${id}`,
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
      const { historyChat, questions } = response.data;
      const slidesData = response.data.slideList;
      const historyData = response.data.historyVote;
      setSlides(slidesData);
      setVoteHistory(historyData);
      setPresentationData({ historyChat, questions });
      setShouldRefetch(false);
    }
  };

  const handleCreateSlide = async () => {
    const response = await createSlide();

    if (response.status === 200) {
      const newSlide = response.data.slide;
      setSlides([...slides, newSlide]);
    }
  };

  const handleChangeTab = (event, value) => {
    if (isPresenting) {
      if (value === "add") {
        setIsErrorViewShow(true);
      } else {
        socket.emit("changeSlide", {
          presentationId: String(presentationID),
          currentSlide: value
        });
      }
    }
    if (!isPresenting) {
      if (value === "add") {
        handleCreateSlide();
      } else {
        setSlideValue(value);
      }
    }
  };

  const handleDeleteSlide = async (e, id, position) => {
    if (isPresenting) {
      setIsErrorViewShow(true);
      return;
    }
    if (position === 0) return;

    const response = await deleteSlide(id);

    if (response.status === 200) {
      e.stopPropagation();

      if (slides.length === 1) {
        return;
      }

      const slideID = parseInt(e.target.id, 10);
      let deletedIndex = 0;

      const newSlides = slides.filter((value, index) => {
        if (value.position === slideID) {
          deletedIndex = index;
        }
        return value.position !== slideID;
      });

      let current = parseInt(slideValue, 10);
      if (current === slideID) {
        if (deletedIndex === 0) {
          current = slides[deletedIndex + 1].position;
        } else {
          current = slides[deletedIndex - 1].position;
        }
      }

      setSlides(newSlides);
      setSlideValue(current);
    }
  };

  const handlePresent = () => {
    setIsPresenting(!isPresenting);
    setSlideValue(0);
    socket.emit("changeSlide", {
      presentationId: String(presentationID),
      currentSlide: 0
    });
  };

  const handleViewResult = () => {
    setIsDialogOpen(true);
  };

  const handleCloseResult = () => {
    setIsDialogOpen(false);
  };

  const handleCloseError = () => {
    setIsErrorViewShow(false);
  };

  const reloadData = () => {
    setShouldRefetch(true);
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
    if (presentationID !== null && slides.length !== 0 && !presentationStart) {
      socket.emit("presentationStart", {
        presentationId: String(presentationID),
        questions: slides
      });
      socketListener(socket, setSlides, setVoteHistory, setSlideValue);

      setPresentationStart(true);
    }
  }, [slides]);

  // Components
  function PresentationBar() {
    const content = isPresenting
      ? "Presenting..."
      : `Viewer link: http://localhost:3000/presentations/view?id=${presentationID}`;

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {content}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handlePresent}
              color="inherit"
            >
              <PresentToAllIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <div>
      <ErrorView
        isErrorShow={isErrorViewShow}
        handleCloseError={handleCloseError}
        errorMessage="You can not do this action while presenting"
      />
      <PresentationBar />
      <ResultList
        isDialogOpen={isDialogOpen}
        handleCloseResult={handleCloseResult}
        history={voteHistory}
        slideID={slides[slideValue]?.id}
      />
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
            flexDirection: "row",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
            overflowY: "auto",
            width: "20%",
            borderRight: 1,
            borderColor: "divider"
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={slideValue}
            onChange={handleChangeTab}
            aria-label="Vertical tabs example"
          >
            {slides.map((slide) => (
              <Tab
                key={slide.position.toString()}
                value={slide.position}
                label={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    width="300px"
                    height="200px"
                  >
                    <OptionsBarChart padding={32} options={slide.options} />
                  </Box>
                }
                icon={
                  <Close
                    id={slide.position}
                    onClick={(e) =>
                      handleDeleteSlide(e, slide.id, slide.position)
                    }
                  />
                }
                {...a11yProps(slide.position)}
                className="mytab"
              />
            ))}
            <Tab icon={<PostAdd />} value="add" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "80%",
            height: "calc(100vh - 64px)",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {slides.map((slide) => (
            <TabPanel value={slideValue} index={slide.position}>
              <OptionsBarChart
                padding={64}
                question={slide.question}
                options={slide.options}
                editorMode
              />
              <QuizForm
                socket={socket}
                presentationID={presentationID}
                slides={slides}
                slideID={slide.id}
                position={slide.position}
                question={slide.question}
                options={slide.options}
                callback={reloadData}
                viewResult={handleViewResult}
              />
            </TabPanel>
          ))}
        </Box>
      </Box>
      <QuickChat
        msgData={presentationData.historyChat}
        questionData={presentationData.questions}
        presentationId={presentationID}
        isDetail
      />
    </div>
  );
}

PresentationDetailPage.propTypes = {
  socket: PropTypes.objectOf(PropTypes.shape)
};

PresentationDetailPage.defaultProps = {
  socket: null
};
