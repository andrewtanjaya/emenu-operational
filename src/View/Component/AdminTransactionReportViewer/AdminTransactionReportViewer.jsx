import { Table } from "antd";
import React, { useState } from "react";
import AdminTransactionBrief from "../AdminTransactionBrief/AdminTransactionBrief";
import "./AdminTransactionReportViewer.css";

function AdminTransactionReportViewer() {
  const columnsA = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      filters: [
        {
          text: "TRX-001",
          value: "TRX-001",
        },
        {
          text: "TRX-002",
          value: "TRX-002",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.orderId === value,
    },
    {
      title: "Order Type",
      dataIndex: "orderType",
      key: "orderType",
      filters: [
        {
          text: "DINE IN",
          value: "DINE IN",
        },
        {
          text: "TAKEAWAY",
          value: "TAKEAWAY",
        },
      ],
      filterSearch: true,
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
      ],
      filterSearch: true,
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: {
        compare: (a, b) => a.createdBy < b.createdBy,
        multiple: 3,
      },
      filters: [
        {
          text: "Andrew",
          value: "Andrew",
        },
        {
          text: "Reinard",
          value: "Reinard",
        },
        {
          text: "Agus",
          value: "Agus",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.createdBy === value,
    },
    {
      title: "Checkout By",
      dataIndex: "checkoutBy",
      key: "checkoutBy",
      sorter: {
        compare: (a, b) => a.checkoutBy < b.checkoutBy,
        multiple: 4,
      },
      filters: [
        {
          text: "ANDREW",
          value: "ANDREW",
        },
        {
          text: "REINARD",
          value: "REINARD",
        },
        {
          text: "AGUS",
          value: "AGUS",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.checkoutBy === value,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a, b) => a.date < b.date,
        multiple: 5,
      },
    },
    {
      title: "Table Number",
      dataIndex: "tableNumber",
      key: "tableNumber",
      sorter: {
        compare: (a, b) => a.tableNumber - b.tableNumber,
        multiple: 6,
      },
    },
    {
      title: "Queue Number",
      dataIndex: "queueNumber",
      key: "queueNumber",
      sorter: {
        compare: (a, b) => a.queueNumber - b.queueNumber,
        multiple: 7,
      },
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      sorter: {
        compare: (a, b) => a.subtotal - b.subtotal,
        multiple: 8,
      },
    },
    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
      sorter: {
        compare: (a, b) => a.serviceCharge - b.serviceCharge,
        multiple: 9,
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
      sorter: {
        compare: (a, b) => a.tax - b.tax,
        multiple: 10,
      },
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
      sorter: {
        compare: (a, b) => a.grandTotal - b.grandTotal,
        multiple: 11,
      },
    },
  ];

  const dataA = [
    {
      key: "1",
      date: "2022-02-25",
      orderId: "TRX-001",
      createdBy: "ANDREW",
      checkoutBy: "ANDREW",
      tableNumber: 1,
      queueNumber: " ",
      orderType: "DINE IN",
      subtotal: "12000",
      serviceCharge: "1000",
      tax: "1100",
      grandTotal: "14100",
      paymentMethod: "QRIS",
    },
    {
      key: "2",
      date: "2022-03-25",
      orderId: "TRX-002",
      createdBy: "AGUS",
      checkoutBy: "AGUS",
      tableNumber: " ",
      queueNumber: "45",
      orderType: "TAKEAWAY",
      subtotal: "1000",
      serviceCharge: "300",
      tax: "400",
      grandTotal: "1700",
      paymentMethod: "Cash",
    },
    {
      key: "3",
      date: "2022-01-25",
      orderId: "TRX-003",
      createdBy: "REINARD",
      checkoutBy: "REINARD",
      tableNumber: " ",
      queueNumber: 33,
      orderType: "TAKEAWAY",
      subtotal: "1100",
      serviceCharge: "310",
      tax: "400",
      grandTotal: "1410",
      paymentMethod: "Cash",
    },
    {
      key: "4",
      date: "2022-01-25",
      orderId: "TRX-004",
      createdBy: "REINARD",
      checkoutBy: "REINARD",
      tableNumber: " ",
      queueNumber: 33,
      orderType: "TAKEAWAY",
      subtotal: "1100",
      serviceCharge: "310",
      tax: "400",
      grandTotal: "1410",
      paymentMethod: "Cash",
    },
    {
      key: "5",
      date: "2022-01-25",
      orderId: "TRX-005",
      createdBy: "REINARD",
      checkoutBy: "REINARD",
      tableNumber: " ",
      queueNumber: 33,
      orderType: "TAKEAWAY",
      subtotal: "1100",
      serviceCharge: "310",
      tax: "400",
      grandTotal: "1410",
      paymentMethod: "Cash",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="transaction-report-viewer-container">
      <div className="brief-information-container">
        <AdminTransactionBrief />
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
        dataSource={dataA}
        onChange={onChange}
      />
      ;
    </div>
  );
}

export default AdminTransactionReportViewer;
