import React from "react";
import { useState } from "react";
import "./CashPaymentMethodDetail.css";

function CashPaymentMethodDetail(props) {
  const [cashAmount, setCashAmount] = useState(0);
  return (
    <div className="cash-payment-method-detail-container">
      <p>
        <b>Cash</b>
      </p>
      <hr />
      <div className="cash-grand-total-container">
        <p>Grand Total</p>
        <p>
          <b>IDR. {props.grandTotal}</b>
        </p>
      </div>
      <div className="cash-grand-total-container">
        <p>Cash</p>
        <div className="cash-grand-total-container">
          <p
            onClick={() => {
              document.querySelector('input[name="cashAmount"]').value =
                props.grandTotal;
              setCashAmount(props.grandTotal);
            }}
            style={{ color: "#36AB27", cursor: "pointer" }}
          >
            <b>Uang Pas</b>
          </p>
          <input
            type="number"
            name="cashAmount"
            id=""
            placeholder="0"
            onChange={(e) => setCashAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="change-container">
        <p>Change</p>
        <p>
          <b>IDR. {cashAmount - props.grandTotal}</b>
        </p>
      </div>
    </div>
  );
}

export default CashPaymentMethodDetail;
