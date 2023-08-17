import React from "react";
import { Button, DatePicker } from "antd";

const Filtering = ({ filterDate, handleDateChange, filterRecords }) => {
  return (
    <div className="Filter-section">
      <DatePicker
        defaultValue={filterDate}
        format="DD-MM-YYYY"
        onChange={handleDateChange}
        className="DatePicker"
      />
      <Button onClick={filterRecords} className="Filter-button">
        Filter Records
      </Button>
    </div>
  );
};

export default Filtering;
