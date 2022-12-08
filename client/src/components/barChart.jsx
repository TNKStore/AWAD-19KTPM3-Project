/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/forbid-prop-types */
import React from "react";
import { PropTypes } from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function OptionsBarChart(props) {
  const { padding, question, options } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width="100%"
        height="100%"
        title={question}
        data={options}
        margin={{
          top: padding,
          right: padding,
          left: padding,
          bottom: padding
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="content" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="upvote" fill="blue" />
      </BarChart>
    </ResponsiveContainer>
  );
}

OptionsBarChart.propTypes = {
  padding: PropTypes.number,
  question: PropTypes.string,
  options: PropTypes.array
};

OptionsBarChart.defaultProps = {
  padding: 0,
  question: "",
  options: []
};
