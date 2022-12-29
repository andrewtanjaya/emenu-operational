import { Select } from "antd";
import React from "react";
import "./AdminReportCard.css";

function AdminReportCard(props) {
  const handleChange = (value) => {
    if (props.setTodayTotalSalesDropdown) {
      props.setTodayTotalSalesDropdown(value);
    } else {
      props.setRangedTotalSalesDropdown(value);
    }
  };

  return (
    <div className="admin-report-card-container">
      <p
        className={
          props.withDropdown
            ? "admin-report-card-value small-value-font"
            : "admin-report-card-value"
        }
      >
        {props.value}
      </p>
      <div className="admin-report-card-description">
        <p>{props.description}</p>
        {props.withDropdown ? (
          <Select
            defaultValue="All"
            style={{ width: 100 }}
            onChange={handleChange}
            options={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "Cash",
                label: "Cash",
              },
              {
                value: "QRIS",
                label: "QRIS",
              },
              {
                value: "Others",
                label: "Others",
              },
            ]}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default AdminReportCard;
