import {
  CheckOutlined,
  FieldTimeOutlined,
  LockOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import React from "react";
import "./CashierOrderCard.css";

function CashierOrderCard() {
  return (
    <div className="cashier-order-card-container">
      <div className="order-number-container">
        <p>06</p>
      </div>
      <div className="order-description-container">
        <p>
          <b>TRX-0b29e47f</b>
        </p>
        <p>
          <b>2 items</b>
        </p>
        <p>DINE-IN</p>
      </div>
      <SwapRightOutlined className="arrow-icon" />
      <div className="cashier-order-list-status-container">
        {/* //on progress <FieldTimeOutlined /> */}
        {/* //placed <LockOutlined /> */}

        <div className="order-status-badge">
          <CheckOutlined className="badge-icon" />
          <span>Ready</span>
        </div>
        <div className="order-status-indicator-container">
          <span className="order-status-indicator"></span>
          <span>Ready to serve</span>
        </div>
      </div>
    </div>
  );
}

export default CashierOrderCard;
