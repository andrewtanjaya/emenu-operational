import { Popconfirm } from "antd";
import React from "react";
import { OrderItemStatus } from "../../../Enum/OrderItemStatus";
import { rupiahWithoutDecimal } from "../../../Helper/Helper";
import "./OrderItemDetail.css";

function OrderItemDetail(props) {
  return (
    <div className="order-item-detail-container">
      <div className="order-item-detail-left">
        <p>
          <b>
            {props.orderItem.orderItemQuantity} x{" "}
            {props.orderItem.orderItemName}
          </b>
        </p>
        <ul>
          {props.orderItem.orderItemOption ? (
            props.orderItem.orderItemOption.map((option) => (
              <li key={option.optionId}>
                <i>
                  <b>{option.groupName} :</b> {option.optionName}{" "}
                </i>
                [+{option.addedValue}]
              </li>
            ))
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="order-item-detail-right">
        <div className="order-status-indicator-container">
          <span
            className={
              props.orderItem.orderItemStatus === OrderItemStatus.PLACED
                ? "order-status-indicator placed-status"
                : props.orderItem.orderItemStatus === OrderItemStatus.PROCESSED
                ? "order-status-indicator processed-status"
                : props.orderItem.orderItemStatus === OrderItemStatus.DELIVERED
                ? "order-status-indicator ready-status"
                : props.orderItem.orderItemStatus === OrderItemStatus.READY
                ? "order-status-indicator ready-status"
                : "order-status-indicator"
            }
          ></span>
          <span
            className={
              props.orderItem.orderItemStatus === OrderItemStatus.PLACED
                ? "placed-color"
                : props.orderItem.orderItemStatus === OrderItemStatus.PROCESSED
                ? "processed-color"
                : props.orderItem.orderItemStatus === OrderItemStatus.DELIVERED
                ? "ready-color"
                : props.orderItem.orderItemStatus === OrderItemStatus.READY
                ? "ready-color"
                : ""
            }
          >
            {props.orderItem.orderItemStatus}
          </span>
        </div>
        <p className="order-item-price">
          {rupiahWithoutDecimal(props.orderItem.subTotalPrice)}
        </p>
        <Popconfirm
          placement="bottom"
          title={"Are you sure want to delete?"}
          onConfirm={() =>
            props.handleDeleteOrderItem(
              props.orderItem.orderItemId,
              props.order
            )
          }
          okText="Yes"
          cancelText="No"
        >
          <button className="delete-order-item-button">delete</button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default OrderItemDetail;
