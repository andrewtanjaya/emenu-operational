import {
  CheckOutlined,
  FieldTimeOutlined,
  LockFilled,
  LockOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { OrderItemStatus } from "../../../Enum/OrderItemStatus";
import { OrderType } from "../../../Enum/OrderType";
import "./CashierOrderCard.css";

function CashierOrderCard(props) {
  const [orderItemBadgeStatus, setOrderItemBadgeStatus] = useState(
    OrderItemStatus.PLACED
  );

  useEffect(() => {
    if (props.order && props.order.orderItems) {
      for (let i = 0; i < Object.keys(OrderItemStatus).length; i++) {
        let filteredOrderItems = props.order.orderItems.filter(
          (orderItem) =>
            orderItem.orderItemStatus === Object.keys(OrderItemStatus)[i]
        );
        if (filteredOrderItems && filteredOrderItems.length) {
          setOrderItemBadgeStatus(Object.keys(OrderItemStatus)[i]);
          break;
        }
      }
    }
  }, [props.order]);
  return (
    <div
      className="cashier-order-card-container"
      onClick={() => props.showOrderDetailDrawer(props.order)}
    >
      <div className="order-number-container">
        <p>
          {props.order.orderType === OrderType.DINE_IN
            ? props.order.orderTable
            : props.order.orderQueue}
        </p>
      </div>
      <div className="order-description-container">
        <p>
          <b>{props.order.orderId}</b>
        </p>
        <p>
          <b>{props.order.orderItems.length} items</b>
        </p>
        <p>{props.order.orderType}</p>
      </div>
      <SwapRightOutlined className="arrow-icon" />
      <div className="cashier-order-list-status-container">
        {/* //on progress <FieldTimeOutlined /> */}

        <div
          className={
            orderItemBadgeStatus === OrderItemStatus.PLACED
              ? "order-status-badge placed-status"
              : orderItemBadgeStatus === OrderItemStatus.PROCESSED
              ? "order-status-badge processed-status"
              : orderItemBadgeStatus === OrderItemStatus.DELIVERED
              ? "order-status-badge ready-status"
              : orderItemBadgeStatus === OrderItemStatus.READY
              ? "order-status-badge ready-status"
              : "order-status-badge"
          }
        >
          {orderItemBadgeStatus === OrderItemStatus.PLACED ? (
            <LockFilled className="badge-icon" />
          ) : orderItemBadgeStatus === OrderItemStatus.PROCESSED ? (
            <FieldTimeOutlined
              style={{ color: "black" }}
              className="badge-icon"
            />
          ) : orderItemBadgeStatus === OrderItemStatus.READY ? (
            <CheckOutlined className="badge-icon" />
          ) : orderItemBadgeStatus === OrderItemStatus.DELIVERED ? (
            <CheckOutlined className="badge-icon" />
          ) : (
            <div className="badge-icon">?</div>
          )}
          <span>
            {orderItemBadgeStatus === OrderItemStatus.PLACED
              ? "Placed"
              : orderItemBadgeStatus === OrderItemStatus.PROCESSED
              ? "In progress"
              : orderItemBadgeStatus === OrderItemStatus.READY
              ? "Ready"
              : orderItemBadgeStatus === OrderItemStatus.DELIVERED
              ? "Delivered"
              : "?"}
          </span>
        </div>
        <div className="order-status-indicator-container">
          <span
            className={
              orderItemBadgeStatus === OrderItemStatus.PLACED
                ? "order-status-indicator placed-status"
                : orderItemBadgeStatus === OrderItemStatus.PROCESSED
                ? "order-status-indicator processed-status"
                : orderItemBadgeStatus === OrderItemStatus.DELIVERED
                ? "order-status-indicator ready-status"
                : orderItemBadgeStatus === OrderItemStatus.READY
                ? "order-status-indicator ready-status"
                : "order-status-indicator"
            }
          ></span>
          <span
            className={
              orderItemBadgeStatus === OrderItemStatus.PLACED
                ? "placed-color"
                : orderItemBadgeStatus === OrderItemStatus.PROCESSED
                ? "processed-color"
                : orderItemBadgeStatus === OrderItemStatus.DELIVERED
                ? "ready-color"
                : orderItemBadgeStatus === OrderItemStatus.READY
                ? "ready-color"
                : ""
            }
          >
            {orderItemBadgeStatus === OrderItemStatus.PLACED
              ? "Order is placed"
              : orderItemBadgeStatus === OrderItemStatus.PROCESSED
              ? "In the kitchen"
              : orderItemBadgeStatus === OrderItemStatus.READY
              ? "Ready to serve"
              : orderItemBadgeStatus === OrderItemStatus.DELIVERED
              ? "Food is delivered"
              : "?"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CashierOrderCard;
