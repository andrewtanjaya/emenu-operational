import { Button, Result } from "antd";
import React from "react";
import "./CashierThankyouDrawerContent.css";

function CashierThankyouDrawerContent(props) {
  return (
    <div className="thankyou-page-container">
      <Result
        status="success"
        title="Payment Success"
        subTitle={
          "Order number: " + props.orderId + " has been paid successfully"
        }
        extra={[
          <Button
            style={{
              borderRadius: "4px",
              border: "none",
              color: "white",
              backgroundColor: "#36AB27",
            }}
            key="console"
          >
            Print Bill
          </Button>,
        ]}
      />
    </div>
  );
}

export default CashierThankyouDrawerContent;
