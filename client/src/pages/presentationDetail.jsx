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
          width="800px"
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
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        width: "100%",
        height: "100%"
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={slideValue}
        onChange={handleChangeTab}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "200px",
          height: "100%"
        }}
      >
        {slides.map((slide) => (
          <Tab
            key={slide.index.toString()}
            value={slide.index}
            label={`Slide ${slide.index}`}
            icon={<Close id={slide.index} onClick={handleDeleteSlide} />}
            {...a11yProps(slide.index)}
            className="mytab"
          />
        ))}
        <Tab icon={<PostAdd />} value="add" />
        {/* <Tab label="Item One" sx={{ height: "100px" }} {...a11yProps(0)} />
        <Tab label="Item Two" sx={{ height: "100px" }} {...a11yProps(1)} />
        <Tab label="Item Three" sx={{ height: "100px" }} {...a11yProps(2)} />
        <Tab label="Item Four" sx={{ height: "100px" }} {...a11yProps(3)} />
        <Tab label="Item Five" sx={{ height: "100px" }} {...a11yProps(4)} />
        <Tab label="Item Six" sx={{ height: "100px" }} {...a11yProps(5)} />
        <Tab label="Item Seven" sx={{ height: "100px" }} {...a11yProps(6)} />
        <Tab label="Item Eight" sx={{ height: "100px" }} {...a11yProps(7)} /> */}
      </Tabs>
      {slides.map((slide) => (
        <TabPanel value={slideValue} index={slide.index}>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <OptionsBarChart />
            <QuizForm />
          </Box>
        </TabPanel>
      ))}
      {/* <TabPanel value={slideValue} index={0}>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          <OptionsBarChart />
          <QuizForm />
        </Box>
      </TabPanel>
      <TabPanel value={slideValue} index={1}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={2}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={3}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={4}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={5}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={6}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={slideValue} index={7}>
        <OptionsBarChart />
      </TabPanel> */}
    </Box>
  );
}
