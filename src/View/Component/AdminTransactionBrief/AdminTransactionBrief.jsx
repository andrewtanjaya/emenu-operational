import React from "react";
import AdminTransactionBriefCard from "../AdminTransactionBriefCard/AdminTransactionBriefCard";
import "./AdminTransactionBrief.css";

function AdminTransactionBrief() {
  return (
    <div className="admin-transaction-brief-container">
      <AdminTransactionBriefCard title={"Total Order"} value={"99"} />
      <AdminTransactionBriefCard
        title={"Total Sales"}
        value={"IDR. 1.999.999"}
      />
      <AdminTransactionBriefCard
        title={"Total Service Charge"}
        value={"IDR. 199.999"}
      />
      <AdminTransactionBriefCard title={"Total Tax"} value={"IDR. 199.999"} />
    </div>
  );
}

export default AdminTransactionBrief;
