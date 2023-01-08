import React, { useEffect } from "react";
import "./CashierReport.css";
import CashierOrderCard from "../../Component/CashierOrderCard/CashierOrderCard";
import CashierCategoryCard from "../../Component/CashierCategoryCard/CashierCategoryCard";
import CashierMenuCard from "../../Component/CashierMenuCard/CashierMenuCard";
import { CategoryController } from "../../../Controller/CategoryController";
import { useState } from "react";
import { FoodController } from "../../../Controller/FoodController";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { OrderController } from "../../../Controller/OrderController";
import { Context } from "../../../Utils/CashierContext";
import OrderDetailDrawer from "../../Component/OrderDetailDrawer/OrderDetailDrawer";
import AddFoodDrwaer from "../../Component/AddFoodDrawer/AddFoodDrawer";
import AddFoodDrawer from "../../Component/AddFoodDrawer/AddFoodDrawer";
import { Button, Drawer, Dropdown, Space, Table, Typography } from "antd";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import { DownOutlined } from "@ant-design/icons";
import { rupiahWithDecimal } from "../../../Helper/Helper";

function CashierReport() {
  let start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  let end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
    },
    {
      title: "Created By",
      dataIndex: "orderCreatedBy",
    },
    {
      title: "Checkout By",
      dataIndex: "orderCheckoutBy",
      render: (_, record) => (
        <>
          {record.orderCheckoutBy ? <p>{record.orderCheckoutBy}</p> : <p>-</p>}
        </>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "orderCreatedDate",
      sorter: (a, b) => a.orderCreatedDate - b.orderCreatedDate,
      render: (_, record) => (
        <>
          {record.orderCreatedDate
            ? new Date(record.orderCreatedDate).toDateString() +
              " at " +
              new Date(record.orderCreatedDate).getHours() +
              ":" +
              new Date(record.orderCreatedDate).getMinutes()
            : "-"}
        </>
      ),
    },
    {
      title: "Paid Date",
      dataIndex: "orderPaidDate",
      sorter: (a, b) => a.orderPaidDate - b.orderPaidDate,
      render: (_, record) => (
        <>
          {record.orderPaidDate
            ? new Date(record.orderPaidDate).toDateString() +
              " at " +
              new Date(record.orderPaidDate).getHours() +
              ":" +
              new Date(record.orderPaidDate).getMinutes()
            : "-"}
        </>
      ),
    },
    {
      title: "OrderType",
      dataIndex: "orderType",
      filters: [
        {
          text: "Dine In",
          value: "DINE-IN",
        },
        {
          text: "Takeaway",
          value: "TAKEAWAY",
        },
      ],
      onFilter: (value, record) => record.orderType.includes(value),
    },
    {
      title: "Order Payment Status",
      dataIndex: "orderPaymentStatus",
      filters: [
        {
          text: "Unpaid",
          value: "UNPAID",
        },
        {
          text: "Paid",
          value: "PAID",
        },
        {
          text: "Cancel",
          value: "CANCEL",
        },
      ],
      onFilter: (value, record) => record.orderPaymentStatus === value,
    },
    {
      title: "Order Table Number",
      dataIndex: "orderTable",
      render: (_, record) => (
        <>{record.orderTable ? <p>{record.orderTable}</p> : <p>-</p>}</>
      ),
      sorter: (a, b) => a.orderTable - b.orderTable,
    },
    {
      title: "Order Queue Number",
      dataIndex: "orderQueue",
      render: (_, record) => (
        <>{record.orderQueue ? <p>{record.orderQueue}</p> : <p>-</p>}</>
      ),
      sorter: (a, b) => a.orderQueue - b.orderQueue,
    },
    {
      title: "Total Amount",
      dataIndex: "totalOrderAmount",
      sorter: (a, b) => a.totalOrderAmount - b.totalOrderAmount,
      render: (_, record) => (
        <>{rupiahWithDecimal(record.finalTotalOrderAmount)}</>
      ),
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      sorter: (a, b) => a.taxAmount - b.taxAmount,
      render: (_, record) => (
        <>{rupiahWithDecimal(record.finalTotalOrderAmount)}</>
      ),
    },
    {
      title: "Service Charge Amount",
      dataIndex: "serviceChargeAmount",
      sorter: (a, b) => a.serviceChargeAmount - b.serviceChargeAmount,
      render: (_, record) => (
        <>{rupiahWithDecimal(record.finalTotalOrderAmount)}</>
      ),
    },
    {
      title: "Final Total Amount",
      dataIndex: "finalTotalOrderAmount",
      sorter: (a, b) => a.finalTotalOrderAmount - b.finalTotalOrderAmount,
      render: (_, record) => (
        <>{rupiahWithDecimal(record.finalTotalOrderAmount)}</>
      ),
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setFilterPaymentType("All");
          }}
        >
          All
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setFilterPaymentType("Cash");
          }}
        >
          Cash
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            setFilterPaymentType("Qris");
          }}
        >
          QRIS
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          onClick={() => {
            setFilterPaymentType("Others");
          }}
        >
          Others
        </div>
      ),
    },
  ];

  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [orders, isLoading, error] = useCollectionData(
    OrderController.getAllOrderByRestaurantIdAndBetweenDateQuery(
      userSession.restaurantId,
      start.getTime(),
      end.getTime()
    ),
    {
      idField: "id",
    }
  );

  const [orderCount, setOrderCount] = useState(0);
  const [unpaidOrder, setUnpaidOrder] = useState([]);
  const [paidOrder, setPaidOrder] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [filterPaymentType, setFilterPaymentType] = useState("All");

  useEffect(() => {
    if (!isLoading) {
      console.log(orders);
      setOrderCount(orders.length);
      setPaidOrder(
        orders.filter((data) => {
          return data.orderPaymentStatus === PaymentStatus.PAID;
        })
      );
      setUnpaidOrder(
        orders.filter((data) => {
          return data.orderPaymentStatus === PaymentStatus.UNPAID;
        })
      );
    }
  }, [orders]);

  useEffect(() => {
    if (!isLoading) {
      if (filterPaymentType === "All") {
        let totalSales = 0;
        orders.forEach((data) => {
          totalSales += data.finalTotalOrderAmount;
        });
        setTotalSales(totalSales);
      } else {
        let totalSales = 0;
        orders.forEach((data) => {
          if (data.paymentMethod === filterPaymentType)
            totalSales += data.finalTotalOrderAmount;
          setTotalSales(totalSales);
        });
      }
    }
  }, [orders, filterPaymentType]);

  return (
    <>
      <div className="cashier-report-container">
        <h1>Today's Report</h1>
        <div className="cashier-report-card-container">
          <div className="report-card">
            <h3>{orderCount}</h3>
            Total Order
          </div>
          <div className="report-card">
            <h3>{rupiahWithDecimal(totalSales)}</h3>
            <div className="card-title-container">
              Total Sales
              <div className="payment-type-dropdown-container">
                <Dropdown
                  arrow
                  menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ["1"],
                  }}
                >
                  <Typography.Link>
                    <Space>
                      {filterPaymentType}
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="report-card">
            <h3>{unpaidOrder.length}</h3>
            Pending Order
          </div>
          <div className="report-card">
            <h3>{paidOrder.length}</h3>
            Completed Order
          </div>
        </div>
        <div className="cashier-report-table">
          <Table
            columns={columns}
            dataSource={orders}
            scroll={{
              x: 1500,
            }}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CashierReport;
