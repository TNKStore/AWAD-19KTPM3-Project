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
  const [slides, setSlides] = useState([{ index: 0, id: 0 }]);
  const [slideValue, setSlideValue] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const location = useLocation();
  const token = getLocalStorage("token");

  // API calls

  const fetchSlides = async () => {
    const headers = {
      "x-access-token": token
    };

    const data = {
      presentationId: presentationID
    };

    const response = await axios
      .get(`${process.env.REACT_APP_DOMAIN}/slide/list`, data, {
        headers
      })
      .catch((error) => console.error("There was an error!", error));

    return response;
  };

  // Handle functions

  const handleFetchSlides = async () => {
    const response = await fetchSlides();

    if (response.status === 200) {
      console.log(response.data);
    }
  };

  const hanldeAddSlide = () => {
    const index = slides[slides.length - 1].index + 1;
    console.log(index);
    setSlides([...slides, { index, id: index }]);
    console.log(slides);
  };

  const handleChangeTab = (event, value) => {
    if (value === "add") {
      hanldeAddSlide();
    } else setSlideValue(value);
  };

  const handleDeleteSlide = (e) => {
    e.stopPropagation();

    if (slides.length === 1) {
      return;
    }

    const slideID = parseInt(e.target.id, 10);
    let deletedIndex = 0;

    const newSlides = slides.filter((value, index) => {
      if (value.index === slideID) {
        deletedIndex = index;
      }
      return value.index !== slideID;
    });

    let current = parseInt(slideValue, 10);
    if (current === slideID) {
      if (deletedIndex === 0) {
        current = slides[deletedIndex + 1].id;
      } else {
        current = slides[deletedIndex - 1].id;
      }
    }

    setSlides(newSlides);
    setSlideValue(current);
  };

  // Use effects

  useEffect(() => {
    if (location.state !== null) {
      setPresentationID(location.state.groupID);
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
              key={slide.index.toString()}
              value={slide.index}
              label={
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  width="300px"
                  height="200px"
                >
                  <OptionsBarChart padding={2} />
                </Box>
              }
              icon={<Close id={slide.index} onClick={handleDeleteSlide} />}
              {...a11yProps(slide.index)}
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
          <TabPanel value={slideValue} index={slide.index}>
            <OptionsBarChart padding={64} />
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
        <QuizForm />
      </Box>
    </Box>
  );
}
