import React from "react";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import "./AdminTransactionReport.css";
import AdminTransactionReportViewer from "../../Component/AdminTransactionReportViewer/AdminTransactionReportViewer";
const { RangePicker } = DatePicker;

function AdminTransactionReport() {
  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const onSelectChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };
  return (
    <div className="transaction-report-container">
      <h1>Report</h1>
      <div className="date-picker-container">
        <Select
          defaultValue="sale"
          style={{
            width: 200,
          }}
          onChange={onSelectChange}
          options={[
            {
              value: "sale",
              label: "Laporan Penjualan",
            },
            {
              value: "product",
              label: "Laporan Produk",
            },
          ]}
        />
        <RangePicker
          presets={rangePresets}
          format="DD/MM/YYYY"
          onChange={onRangeChange}
        />
      </div>
      <AdminTransactionReportViewer />
    </div>
  );
}

export default AdminTransactionReport;
