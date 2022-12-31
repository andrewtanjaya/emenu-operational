import React from "react";
import "./CashierOrderDetailsDrawerContent.css";
import { OrderType } from "../../../Enum/OrderType";
import OrderItemDetail from "../OrderItemDetail/OrderItemDetail";

function CashierOrderDetailsDrawerContent(props) {

  return (
    <div className="order-details-drawer-container">
      <div className="order-details-header-drawer">
        <p>Order Type &emsp;&emsp;: {props.order.orderType}</p>
        {props.order.orderType === OrderType.DINE_IN ? (
          <p>Table Number&emsp;: {props.order.orderTable}</p>
        ) : (
          <p>Queue Number&emsp;: {props.order.orderQueue}</p>
        )}
        <p>{new Date(props.order.orderCreatedDate).toUTCString()}</p>
        <p>
          <b>#{props.order.orderId}</b>
        </p>
      </div>
      <div className="order-details-order-items-list">
        {props.order.orderItems ? (
          (props.order.orderItems).map((orderItem) => (
            <OrderItemDetail key={orderItem.orderItemId} handleDeleteOrderItem={props.handleDeleteOrderItem} orderItem={orderItem} />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="order-details-footer-drawer">
        <hr />
        <p>
          <span>Subtotal</span>
          <span>IDR. {props.order.totalOrderAmount}</span>
        </p>
        <p>
          <span>Tax {props.order.taxRate}%</span>
          <span>IDR. {props.order.taxAmount}</span>
        </p>
        <p>
          <span>Service Charge {props.order.serviceChargeRate}%</span>
          <span>IDR. {props.order.taxAmount}</span>
        </p>
        <hr />
        <p>
          <span>
            <b>Total</b>
          </span>
          <span>
            <b>IDR. {props.order.finalTotalOrderAmount}</b>
          </span>
        </p>
        <button onClick={() => props.setPage(1)}>Pay IDR. {props.order.finalTotalOrderAmount}</button>
      </div>
    </div>
  );
}

export default CashierOrderDetailsDrawerContent;
