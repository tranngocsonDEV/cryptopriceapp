import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ historicalcoinData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalcoinData && historicalcoinData.prices) {
      const dataCopy = [["Date", "Prices"]];
      historicalcoinData.prices.forEach((item) => {
        dataCopy.push([
          new Date(item[0]).toLocaleDateString().slice(0, -5),
          item[1]
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalcoinData]);

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="100%"
      data={data}
      legendToggle
    />
  );
};

export default LineChart;
