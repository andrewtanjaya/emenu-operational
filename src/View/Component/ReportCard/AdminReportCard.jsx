import { Select } from "antd";
import React from "react";
import "./AdminReportCard.css";

function AdminReportCard(props) {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="admin-report-card-container">
      <p className= {props.withDropdown ? "admin-report-card-value small-value-font" : "admin-report-card-value"}>{props.value}</p>
      <div className="admin-report-card-description">
        <p>{props.description}</p>
        {
            props.withDropdown ? <Select
            defaultValue="all"
            style={{ width: 100 }}
            onChange={handleChange}
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "cash",
                label: "Cash",
              },
              {
                value: "qris",
                label: "QRIS",
              },
              {
                value: "others",
                label: "Others",
              },
            ]}
          /> : <></>
        }
      </div>
    </div>
  );
}

export default AdminReportCard;
