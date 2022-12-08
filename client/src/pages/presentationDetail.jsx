/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Close, PostAdd } from "@mui/icons-material";
import axios from "axios";
import { useLocation } from "react-router";
import { getLocalStorage } from "../utils/localStorage";
import OptionsBarChart from "../components/barChart";
import QuizForm from "../components/quizForm";

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
          flexDirection="column"
          width="900px"
          height="500px"
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

export default function PresentationDetailPage() {
  const [presentationID, setPresentationID] = useState("");
  const [slides, setSlides] = useState([]);
  const [slideValue, setSlideValue] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const location = useLocation();
  const token = getLocalStorage("token");

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
      const data = response.data.slideList;
      setSlides(data);
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
    if (value === "add") {
      handleCreateSlide();
    } else {
      setSlideValue(value);
      setCurrentSlide(slides[value]);
    }
    console.log(currentSlide);
  };

  const handleDeleteSlide = async (e, id, position) => {
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
      setCurrentSlide(slides[current]);
    }
  };

  // Use effects

  useEffect(() => {
    if (location.state !== null) {
      setPresentationID(location.state.presentationID);
    }
  }, [presentationID]);

  useEffect(() => {
    if (presentationID !== "" && shouldRefetch) {
      handleFetchSlides({});
    }
  }, [presentationID, shouldRefetch]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "start",
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 64px)",
          overflow: "hidden",
          overflowY: "auto",
          width: "18%",
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
          width: "50%",
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
            />
          </TabPanel>
        ))}
      </Box>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          borderColor: "rgba(0, 0, 0, 0.12)",
          borderLeft: 1
        }}
      >
        <QuizForm
          question={currentSlide?.question}
          options={currentSlide?.options}
        />
      </Box>
    </Box>
  );
}
