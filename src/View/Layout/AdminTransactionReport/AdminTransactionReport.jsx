import React from "react";
import dayjs from "dayjs";
import { DatePicker, Select } from "antd";
import "./AdminTransactionReport.css";
import AdminTransactionReportViewer from "../../Component/AdminTransactionReportViewer/AdminTransactionReportViewer";
import { useState } from "react";
const { RangePicker } = DatePicker;

function AdminTransactionReport() {
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
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

  const onRangeChange = (dates, dateStrings) => {
    
    if (dates) {
      setStartDate(new Date(dates[0]).setHours(0, 0, 0, 0));
      setEndDate(new Date(dates[1]).setHours(23, 59, 59, 999));
    }
  };
  return (
    <div className="transaction-report-container">
      <h1>Report</h1>
      <div className="date-picker-container">
        {/* <Select
          defaultValue="sale"
          style={{
            width: 300,
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
        /> */}
        <RangePicker
          presets={rangePresets}
          format="DD/MM/YYYY"
          onChange={onRangeChange}
        />
      </div>
      <AdminTransactionReportViewer startDate={startDate} endDate={endDate}/>
    </div>
  );
}

export default AdminTransactionReport;
