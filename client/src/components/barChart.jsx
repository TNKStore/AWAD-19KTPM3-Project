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

const data = [
  {
    name: "Page A",
    pv: 24
  },
  {
    name: "Page B",
    pv: 30
  },
  {
    name: "Page C",
    pv: 20
  }
];

export default function OptionsBarChart(props) {
  const { padding } = props;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width="100%"
        height="100%"
        data={data}
        margin={{
          top: padding,
          right: padding,
          left: padding,
          bottom: padding
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="blue" />
      </BarChart>
    </ResponsiveContainer>
  );
}

OptionsBarChart.propTypes = {
  padding: PropTypes.number
};

OptionsBarChart.defaultProps = {
  padding: 0
};
