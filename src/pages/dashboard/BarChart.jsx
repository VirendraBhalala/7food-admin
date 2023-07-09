import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ orderData, revanueData }) => {
  const optionsOrder = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Order Chart",
      },
    },
  };
  const optionsRevenue = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Chart",
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const currentMonthIndex = new Date().getMonth() + 1

  // const labelsArray = labels?.slice(0, currentMonthIndex)

  const orderDataArray = orderData?.slice(0, currentMonthIndex)
  const revanueDataArray = revanueData?.slice(0, currentMonthIndex)

  const dataSetsOrder = {
    labels,
    datasets: [
      {
        label: "1st Month",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgb(255, 99, 132)",
        data: orderDataArray,
      },
    ],
  };
  const dataSetsRevenue = {
    labels,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "red",
        borderColor: "rgb(255, 99, 132)",
        data: revanueDataArray,
      },
    ],
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* dataSetsOrder */}
      <div className="col-span-6">
        <Line options={optionsOrder} data={dataSetsOrder} />
      </div>
      {/* dataSetsRevenue */}
      <div className="col-span-6">
        <Line options={optionsRevenue} data={dataSetsRevenue} />
      </div>
    </div>
  );
};

export default BarChart;
