import React from "react";
import {
  rupiahWithDecimal,
  rupiahWithoutDecimal,
} from "../../../Helper/Helper";
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
        value={rupiahWithDecimal(props.briefData.totalSales)}
      />
      <AdminTransactionBriefCard
        title={"Total Service Charge"}
        value={rupiahWithDecimal(props.briefData.totalServiceCharge)}
      />
      <AdminTransactionBriefCard
        title={"Total Tax"}
        value={rupiahWithDecimal(props.briefData.totalTax)}
      />
    </div>
  );
}

export default AdminTransactionBrief;
