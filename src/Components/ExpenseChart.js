import LineChart from "./LineChart";
import { UserData } from "./Data";
import { Button, Tabs } from "antd";
import { useHistory } from "react-router-dom";
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

    // Sort data by date
  filteredUserData.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/");
      const [dayB, monthB, yearB] = b.date.split("/");
      const dateA = new Date(yearA, monthA - 1, dayA); // Months are zero-based, so subtract 1
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA - dateB;
    });

  // Extract individual expenses and cumulative total
  const individualExpenses = filteredUserData.map((data) => data.price);
  const cumulativeTotal = calculateCumulativeTotal(individualExpenses);
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };
  
   return {
    labels: filteredUserData.map((data) => formatDate(data.date)),
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
  
  const history = useHistory(); // Initialize useHistory
  // Calculate cumulative total
  const calculateCumulativeTotal = (data) => {
    let cumulativeTotal = 0;
    return data.map((value) => {
      cumulativeTotal += value;
      return cumulativeTotal;
    });
  };

// Filter data for the last month
const today = new Date();
const lastMonth = new Date(today);
lastMonth.setMonth(lastMonth.getMonth() - 1);

const filteredLastMonthUserData = UserData.filter((data) => {
  const [day, month, year] = data.date.split("/");
  const dataMonth = parseInt(month, 10);
  const dataYear = parseInt(year, 10);

  return (
    dataYear === lastMonth.getFullYear() &&
    dataMonth === lastMonth.getMonth() + 1 // Months are zero-based, so add 1
  );
});

// Filter data for the last 6 months

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

const filteredLastSixMonthsUserData = UserData.filter((data) => {
  const [day, month, year] = data.date.split("/");
  const dataDate = new Date(year, month - 1, day); // Months are zero-based, so subtract 1
  return dataDate >= sixMonthsAgo && dataDate <= today;
});


// Filter data for the last 12 months
const twelveMonthsAgo = new Date();
twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

const filteredLastTwelveMonthsUserData = UserData.filter((data) => {
  const [day, month, year] = data.date.split("/");
  const dataDate = new Date(year, month - 1, day); // Months are zero-based, so subtract 1
  return dataDate >= twelveMonthsAgo && dataDate <= today;
});


  const budgetMonth = 500; // Fixed budget value for the month
  const budgetSixMonth = budgetMonth*6; // Fixed budget value for 6 months
  const budgetYear = budgetMonth*12; // Fixed budget value for 6 months



  return (
    <div className="expensechart">
      <div className="card">
        <h2>Budget Analysis</h2>
        < Button             
            type="primary"
            htmlType="submit"
            className="return-button"
            onClick={() => {
              history.push("/dashboard"); // Navigate to "/dashboard"
            }}> Back </Button>
        <Tabs defaultActiveKey="lastMonth">
          <Tabs.TabPane tab="Last Month" key="lastMonth">

            <div className="chart-container-wide">
             <LineChart chartData={getChartData(filteredLastMonthUserData, budgetMonth)} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Last 6 Months" key="lastSixMonths">
            <div className="chart-container-wide">
                <LineChart chartData={getChartData(filteredLastSixMonthsUserData, budgetSixMonth)} />
              </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Last 12 Months" key="lastTwelveMonths">
            <div className="chart-container-wide">
                <LineChart chartData={getChartData(filteredLastTwelveMonthsUserData, budgetYear)} />
              </div>
          </Tabs.TabPane>
          
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseChart;