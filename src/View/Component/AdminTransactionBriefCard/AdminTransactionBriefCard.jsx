import React from "react";
import "./AdminTransactionBriefCard.css";

function AdminTransactionBriefCard({ title, value }) {
  return (
    <div className="transaction-brief-card-container">
      <div className="logo-transaction-brief-card">
        <img src="" alt="" />
      </div>
      <div className="description-transaction-brief-card">
        <p>
          <b>{title}</b>
        </p>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default AdminTransactionBriefCard;
