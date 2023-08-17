import React, { useState } from "react";
import LineChart from "./LineChart";
import { UserData } from "./Data";
import { Tabs, notification } from "antd";
import "../Styles/ExpenseChart.css";

const getChartData = (filteredUserData, budget) => {
  // Calculate cumulative total
  const calculateCumulativeTotal = (data) => {
    let cumulativeTotal = 0;
    return data.map((value) => {
      cumulativeTotal += value;
      return cumulativeTotal;
    });
  };

  // Extract individual expenses and cumulative total
  const individualExpenses = filteredUserData.map((data) => data.price);
  const cumulativeTotal = calculateCumulativeTotal(individualExpenses);

  return {
    labels: filteredUserData.map((data) => data.date),
    datasets: [
      {
        label: "Individual Expenses",
        data: individualExpenses,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Cumulative Total",
        data: cumulativeTotal,
        type: "line",
        borderColor: "black",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Budget",
        data: Array(filteredUserData.length).fill(budget), // Use the provided budget value
        type: "line",
        borderColor: "red",
        borderWidth: 2,
        fill: false,
      },
    ],
  };
};

const ExpenseChart = () => {
  // Calculate cumulative total
  const calculateCumulativeTotal = (data) => {
    let cumulativeTotal = 0;
    return data.map((value) => {
      cumulativeTotal += value;
      return cumulativeTotal;
    });
  };

  // Filter data for the last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const filteredLastMonthUserData = UserData.filter((data) => {
    const [day, month, year] = data.date.split("/");
    const dataDate = new Date(`${month}/${day}/${year}`);
    return dataDate >= lastMonth;
  });

  // Filter data for the last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const filteredLastSixMonthsUserData = UserData.filter((data) => {
    const [day, month, year] = data.date.split("/");
    const dataDate = new Date(`${month}/${day}/${year}`);
    return dataDate >= sixMonthsAgo;
  });

  // Filter data for the last 12 months
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
  const filteredLastTwelveMonthsUserData = UserData.filter((data) => {
    const [day, month, year] = data.date.split("/");
    const dataDate = new Date(`${month}/${day}/${year}`);
    return dataDate >= twelveMonthsAgo;
  });

  const budgetMonth = 1000; // Fixed budget value for the month
  const budgetSixMonth = budgetMonth*6; // Fixed budget value for 6 months
  const budgetYear = budgetMonth*12; // Fixed budget value for 6 months



  return (
    <div className="expensechart">
      <div className="card">
        <h2>Budget Analysis</h2>
        <Tabs defaultActiveKey="lastMonth">
          <Tabs.TabPane tab="Last Month" key="lastMonth">
            <div>
              <h2 className="left-corner">Last Month</h2>
              <div className="chart-container-wide">
                <LineChart chartData={getChartData(filteredLastMonthUserData, budgetMonth)} />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Last 6 Months" key="lastSixMonths">
            <div>
              <h2 className="left-corner">Last 6 Months</h2>
              <div className="chart-container-wide">
                <LineChart chartData={getChartData(filteredLastSixMonthsUserData, budgetSixMonth)} />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Last 12 Months" key="lastTwelveMonths">
            <div>
              <h2 className="left-corner">Last 12 Months</h2>
              <div className="chart-container-wide">
                <LineChart chartData={getChartData(filteredLastTwelveMonthsUserData, budgetYear)} />
              </div>
            </div>
          </Tabs.TabPane>
          {/* Add more TabPanes for different filters */}
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseChart;
