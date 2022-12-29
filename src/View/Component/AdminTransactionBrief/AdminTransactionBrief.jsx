import React from "react";
import AdminTransactionBriefCard from "../AdminTransactionBriefCard/AdminTransactionBriefCard";
import "./AdminTransactionBrief.css";

function AdminTransactionBrief(props) {
  return (
    <div className="admin-transaction-brief-container">
      <AdminTransactionBriefCard
        title={"Total Order"}
        value={props.briefData.totalOrder}
      />
      <AdminTransactionBriefCard
        title={"Total Sales"}
        value={"IDR." + props.briefData.totalSales}
      />
      <AdminTransactionBriefCard
        title={"Total Service Charge"}
        value={"IDR." + props.briefData.totalServiceCharge}
      />
      <AdminTransactionBriefCard
        title={"Total Tax"}
        value={"IDR." + props.briefData.totalTax}
      />
    </div>
  );
}

export default AdminTransactionBrief;
