import { Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { OrderController } from "../../../Controller/OrderController";
import { UserController } from "../../../Controller/UserController";
import { RoleTypes } from "../../../Enum/RoleTypes";
import AdminTransactionBrief from "../AdminTransactionBrief/AdminTransactionBrief";
import "./AdminTransactionReportViewer.css";

function AdminTransactionReportViewer(props) {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [orderData, setOrderData] = useState([]);
  const [cashierUser, setCashierUser] = useState([]);
  const [briefData, setBriefData] = useState({
    totalOrder: 0,
    totalServiceCharge: 0,
    totalSales: 0,
    totalTax: 0,
  });
  const [users, isLoading, error] = useCollectionData(
    UserController.getAllUsersByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    if (!isLoading && users) {
      setCashierUser(
        users.filter((user) => user.roleType === RoleTypes.CASHIER)
      );
    }
  }, [users]);

  useEffect(() => {
    if (props.startDate !== 0 && props.endDate !== 0) {
      OrderController.getAllOrderByRestaurantId(userSession.restaurantId).then(
        (res) => {
          let tempOrders = [];
          let totalServiceCharge = 0;
          let totalSales = 0;
          let totalTax = 0;
          res.docs.map((doc) => {
            let order = doc.data();
            order.key = order.orderId;
            totalServiceCharge += order.serviceChargeAmount;
            totalSales += order.totalOrderAmount;
            totalTax += order.taxAmount;
            tempOrders = [...tempOrders, order];
          });
          setBriefData({
            totalSales: totalSales,
            totalOrder: tempOrders.length,
            totalServiceCharge: totalServiceCharge,
            totalTax: totalTax,
          });
          setOrderData(tempOrders);
        }
      );
    }
  }, [props.startDate, props.endDate]);

  const filterData = (data) => (formatter) =>
    data.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const columnsA = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      filters: filterData(orderData)((i) => i.orderId),
      filterSearch: true,
      onFilter: (value, record) => record.orderId === value,
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
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
      onFilter: (value, record) => record.orderType === value,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      sorter: {
        compare: (a, b) => a.paymentMethod < b.paymentMethod,
        multiple: 2,
      },
      filters: [
        {
          text: "QRIS",
          value: "QRIS",
        },
        {
          text: "Cash",
          value: "Cash",
        },
        {
          text: "Others",
          value: "Others",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: "Order Created By",
      dataIndex: "orderCreatedBy",
      key: "orderCreatedBy",
      filters: filterData(cashierUser)((i) => i.email),
      sorter: {
        compare: (a, b) => a.orderCreatedBy < b.orderCreatedBy,
        multiple: 3,
      },
      filterSearch: true,
      onFilter: (value, record) => record.orderCreatedBy === value,
    },
    {
      title: "Order Checkout By",
      dataIndex: "orderCheckoutBy",
      key: "orderCheckoutBy",
      filters: filterData(cashierUser)((i) => i.email),
      sorter: {
        compare: (a, b) => a.checkoutBy < b.checkoutBy,
        multiple: 4,
      },
      filterSearch: true,
      onFilter: (value, record) => record.orderCheckoutBy === value,
    },
    {
      title: "Order Created Date",
      dataIndex: "orderCreatedDate",
      key: "orderCreatedDate",
      render: (_, record) => (
        <p>
          {record.orderCreatedDate
            ? new Date(record.orderCreatedDate).toUTCString()
            : "-"}
        </p>
      ),
      sorter: {
        compare: (a, b) => a.orderCreatedDate < b.orderCreatedDate,
        multiple: 5,
      },
    },
    {
      title: "Order Paid Date",
      dataIndex: "orderPaidDate",
      key: "orderCreatedDate",
      render: (_, record) => (
        <p>
          {record.orderPaidDate
            ? new Date(record.orderPaidDate).toUTCString()
            : "-"}
        </p>
      ),
      sorter: {
        compare: (a, b) => a.orderPaidDate < b.orderPaidDate,
        multiple: 6,
      },
    },
    {
      title: "Table Number",
      dataIndex: "orderTable",
      key: "orderTable",
      render: (_, record) => (
        <>{record.orderTable ? <p>{record.orderTable}</p> : <p>-</p>}</>
      ),
      sorter: {
        compare: (a, b) => a.orderTable - b.orderTable,
        multiple: 7,
      },
    },
    {
      title: "Queue Number",
      dataIndex: "orderQueue",
      key: "orderQueue",
      render: (_, record) => (
        <>{record.orderQueue ? <p>{record.orderQueue}</p> : <p>-</p>}</>
      ),
      sorter: {
        compare: (a, b) => a.orderQueue - b.orderQueue,
        multiple: 8,
      },
    },
    {
      title: "Subtotal",
      dataIndex: "totalOrderAmount",
      key: "totalOrderAmount",
      render: (_, record) => <p>IDR. {record.totalOrderAmount}</p>,
      sorter: {
        compare: (a, b) => a.totalOrderAmount - b.totalOrderAmount,
        multiple: 9,
      },
    },
    {
      title: "Service Charge",
      dataIndex: "serviceChargeAmount",
      key: "serviceChargeAmount",
      render: (_, record) => <p>IDR. {record.serviceChargeAmount}</p>,
      sorter: {
        compare: (a, b) => a.serviceChargeAmount - b.serviceChargeAmount,
        multiple: 10,
      },
    },
    {
      title: "Tax",
      dataIndex: "taxAmount",
      key: "taxAmount",
      render: (_, record) => <p>IDR. {record.taxAmount}</p>,
      sorter: {
        compare: (a, b) => a.taxAmount - b.taxAmount,
        multiple: 11,
      },
    },
    {
      title: "Grand Total",
      dataIndex: "finalTotalOrderAmount",
      key: "finalTotalOrderAmount",
      render: (_, record) => <p>IDR. {record.finalTotalOrderAmount}</p>,
      sorter: {
        compare: (a, b) => a.finalTotalOrderAmount - b.finalTotalOrderAmount,
        multiple: 12,
      },
    },
    {
      title: "Payment Status",
      dataIndex: "orderPaymentStatus",
      key: "orderPaymentStatus",
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
      filterSearch: true,
      onFilter: (value, record) => record.orderPaymentStatus === value,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="transaction-report-viewer-container">
      <div className="brief-information-container">
        <AdminTransactionBrief briefData={briefData} />
      </div>
      <Table
        scroll={{
          x: 2000,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["20", "50", "100"],
        }}
        columns={columnsA}
        dataSource={orderData}
        onChange={onChange}
      />
    </div>
  );
}

export default AdminTransactionReportViewer;
