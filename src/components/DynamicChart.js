import React from "react";
import { Bar, Line, Radar } from "react-chartjs-2";

const Chart = ({ data, type, options }) => {
  let ChartType;

  switch (type) {
    case "Bar":
      ChartType = Bar;
      break;
    case "Radar":
      ChartType = Radar;
      break;
    case "Line":
      ChartType = Line;
      break;
    default:
      return null;
  }

  return <ChartType data={data} options={{ ...options, maintainAspectRatio: false }} height={700} width={700} />;
};

export default Chart;
