/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          width: "200px",
          height: "100%"
        }}
      >
        <Tab label="Item One" sx={{ height: "100px" }} {...a11yProps(0)} />
        <Tab label="Item Two" sx={{ height: "100px" }} {...a11yProps(1)} />
        <Tab label="Item Three" sx={{ height: "100px" }} {...a11yProps(2)} />
        <Tab label="Item Four" sx={{ height: "100px" }} {...a11yProps(3)} />
        <Tab label="Item Five" sx={{ height: "100px" }} {...a11yProps(4)} />
        <Tab label="Item Six" sx={{ height: "100px" }} {...a11yProps(5)} />
        <Tab label="Item Seven" sx={{ height: "100px" }} {...a11yProps(6)} />
        <Tab label="Item Eight" sx={{ height: "100px" }} {...a11yProps(7)} />
      </Tabs>
      <TabPanel value={value} index={0}>
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
      <TabPanel value={value} index={1}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <OptionsBarChart />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <OptionsBarChart />
      </TabPanel>
    </Box>
  );
}
