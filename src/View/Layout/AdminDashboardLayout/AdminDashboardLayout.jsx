import { DatePicker, Table } from "antd";
import React from "react";
import dayjs from "dayjs";
import AdminReportCard from "../../Component/ReportCard/AdminReportCard";
import "./AdminDashboardLayout.css";

function AdminDashboardLayout() {
  const { RangePicker } = DatePicker;
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
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  const dataSource = [
    {
      key: "1",
      menuName: "Mie Goreng",
      totalSold: 99,
      totalSales: "IDR. 1.999.999",
    },
    {
      key: "2",
      menuName: "Ayam Goreng",
      totalSold: 42,
      totalSales: "IDR. 199.999",
    },
    {
      key: "23",
      menuName: "Ayam Goreng",
      totalSold: 42,
      totalSales: "IDR. 199.999",
    },
    {
      key: "4",
      menuName: "Ayam Goreng",
      totalSold: 42,
      totalSales: "IDR. 199.999",
    },
    {
      key: "5",
      menuName: "Ayam Goreng",
      totalSold: 42,
      totalSales: "IDR. 199.999",
    },
  ];

  const columns = [
    {
      title: "Rank",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (item, record, index) => <>{index + 1}</>,
    },
    {
      title: "Menu Name",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "Total Sold",
      dataIndex: "totalSold",
      width: "10%",
      key: "totalSold",
    },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-report-container">
        <h1>Today's Report</h1>
        <div className="admin-dashboard-today-brief-section">
          <div className="admin-today-brief-upper">
            <AdminReportCard value={"30"} description={"Total Order"} />
            <AdminReportCard
              value={"IDR. 1.999.999"}
              description={"Total Sales"}
              withDropdown={true}
            />
          </div>
          <div className="admin-today-brief-lower">
            <AdminReportCard value={"2"} description={"Pending Order"} />
            <AdminReportCard value={"28"} description={"Completed Order"} />
          </div>
        </div>
        <div className="admin-report-by-date-header-container">
          <h1>Report by date</h1>
          <RangePicker
            presets={rangePresets}
            format="DD/MM/YYYY"
            onChange={onRangeChange}
          />
        </div>
        <div className="admin-dashboard-report-by-date-section">
          <AdminReportCard value={"30"} description={"Total Order"} />
          <AdminReportCard
            value={"IDR. 1.999.999"}
            description={"Total Sales"}
            withDropdown={true}
          />
        </div>
        <div className="admin-report-by-date-header-container">
          <h1>Menu Ranking</h1>
          <RangePicker
            presets={rangePresets}
            format="DD/MM/YYYY"
            onChange={onRangeChange}
          />
        </div>
        <Table
          pagination={false}
          style={{ width: "100%" }}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
