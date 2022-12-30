import { DatePicker, Table } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import AdminReportCard from "../../Component/ReportCard/AdminReportCard";
import "./AdminDashboardLayout.css";
import { OrderController } from "../../../Controller/OrderController";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FoodController } from "../../../Controller/FoodController";

function AdminDashboardLayout() {
  const { RangePicker } = DatePicker;
  const [todayTotalSalesDropdown, setTodayTotalSalesDropdown] = useState("All");
  const [rangedTotalSalesDropdown, setRangedTotalSalesDropdown] =
    useState("All");
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [todayBriefData, setTodayBriefData] = useState({
    totalOrder: 0,
    totalSales: 0,
    totalPendingOrder: 0,
    totalCompletedOrder: 0,
  });
  const [totalSalesByRange, setTotalSalesByRange] = useState(0);
  const [allOrderData, setAllOrderData] = useState([]);
  const [todayOrderData, setTodayOrderData] = useState([]);
  const [rangedOrderData, setRangedOrderData] = useState([]);
  const [startDateReport, setStartDateReport] = useState(0);
  const [endDateReport, setEndDateReport] = useState(0);

  let todayStartDate = new Date().setHours(0, 0, 0, 0);
  let todayEndDate = new Date().setHours(23, 59, 59, 999);

  const [foods, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    OrderController.getAllOrderByRestaurantId(userSession.restaurantId).then(
      (res) => {
        let tempOrders = [];
        res.docs.map((doc) => {
          let order = doc.data();
          order.key = order.orderId;
          tempOrders = [...tempOrders, order];
        });
        setAllOrderData(tempOrders);
        let tempTodayOrder = tempOrders.filter(
          (order) =>
            order.orderCreatedDate >= todayStartDate &&
            order.orderCreatedDate <= todayEndDate
        );
        let todayTotalSales = 0;
        tempTodayOrder.forEach((order) => {
          todayTotalSales += order.totalOrderAmount;
        });

        setTodayBriefData({
          totalOrder: tempTodayOrder.length,
          totalSales: todayTotalSales,
          totalPendingOrder: tempTodayOrder.filter(
            (order) => order.orderPaymentStatus === "UNPAID"
          ).length,
          totalCompletedOrder: tempTodayOrder.filter(
            (order) => order.orderPaymentStatus === "PAID"
          ).length,
        });
        setTodayOrderData(tempTodayOrder);
      }
    );
  }, []);

  useEffect(() => {
    console.log(foods)
    let tempTodayData = todayOrderData;
    if (todayTotalSalesDropdown !== "All") {
      tempTodayData = todayOrderData.filter((order) =>
        order.paymentMethod
          .toLowerCase()
          .includes(todayTotalSalesDropdown.toLowerCase())
      );
    }
    let todayTotalSales = 0;
    tempTodayData.forEach((order) => {
      todayTotalSales += order.totalOrderAmount;
    });
    setTodayBriefData((todayBriefData) => ({
      totalSales: todayTotalSales,
      totalOrder: todayBriefData.totalOrder,
      totalPendingOrder: todayBriefData.totalPendingOrder,
      totalCompletedOrder: todayBriefData.totalCompletedOrder,
    }));
  }, [todayTotalSalesDropdown]);

  useEffect(() => {
    let tempRangedData = rangedOrderData;
    if (rangedTotalSalesDropdown !== "All") {
      tempRangedData = rangedOrderData.filter((order) =>
        order.paymentMethod
          .toLowerCase()
          .includes(rangedTotalSalesDropdown.toLowerCase())
      );
    }
    let rangedTotalSales = 0;
    tempRangedData.forEach((order) => {
      rangedTotalSales += order.totalOrderAmount;
    });
    setTotalSalesByRange(rangedTotalSales);
  }, [rangedTotalSalesDropdown]);

  useEffect(() => {
    let tempRangeData = allOrderData.filter(
      (order) =>
        order.orderCreatedDate >= startDateReport &&
        order.orderCreatedDate <= endDateReport
    );
    let tempTotalSalesRanged = 0;
    tempRangeData.forEach((order) => {
      tempTotalSalesRanged += order.totalOrderAmount;
    });
    setTotalSalesByRange(tempTotalSalesRanged);
    setRangedOrderData(tempRangeData);
  }, [startDateReport, endDateReport]);

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
      setStartDateReport(new Date(dates[0]).setHours(0, 0, 0, 0));
      setEndDateReport(new Date(dates[1]).setHours(23, 59, 59, 999));
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
      title: "Food Name",
      dataIndex: "foodName",
      key: "foodName",
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
            <AdminReportCard
              value={todayOrderData.length}
              description={"Total Order"}
            />
            <AdminReportCard
              value={"IDR. " + todayBriefData.totalSales}
              description={"Total Sales"}
              withDropdown={true}
              setTodayTotalSalesDropdown={setTodayTotalSalesDropdown}
            />
          </div>
          <div className="admin-today-brief-lower">
            <AdminReportCard
              value={todayBriefData.totalPendingOrder}
              description={"Pending Order"}
            />
            <AdminReportCard
              value={todayBriefData.totalCompletedOrder}
              description={"Completed Order"}
            />
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
          <AdminReportCard
            value={rangedOrderData.length}
            description={"Total Order"}
          />
          <AdminReportCard
            value={"IDR. " + totalSalesByRange}
            description={"Total Sales"}
            withDropdown={true}
            setRangedTotalSalesDropdown={setRangedTotalSalesDropdown}
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
          dataSource={(foods.sort((a, b) => (a > b ? -1 : 1))).slice(0,5)}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;