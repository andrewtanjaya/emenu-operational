import React from "react";
import "./CashierOrderDetailsDrawerContent.css";
import { OrderType } from "../../../Enum/OrderType";
import OrderItemDetail from "../OrderItemDetail/OrderItemDetail";
import { rupiahWithoutDecimal } from "../../../Helper/Helper";
import { useEffect } from "react";
import { useState } from "react";
import { Popconfirm } from "antd";

function CashierOrderDetailsDrawerContent(props) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    setSelectedOrder(
      props.allOrder.filter((data) => {
        return data.orderId === props.order.orderId;
      })
    );
  }, [props.allOrder, props.order]);
  return (
    selectedOrder &&
    selectedOrder.length > 0 && (
      <div className="order-details-drawer-container">
        <div className="order-details-header-drawer">
          <p>Order Type &emsp;&emsp;: {selectedOrder[0].orderType}</p>
          {selectedOrder[0].orderType === OrderType.DINE_IN ? (
            <p>Table Number&emsp;: {selectedOrder[0].orderTable}</p>
          ) : (
            <p>Queue Number&emsp;: {selectedOrder[0].orderQueue}</p>
          )}
          <p>
            {new Date(selectedOrder[0].orderCreatedDate).toDateString() +
              " at " +
              new Date(selectedOrder[0].orderCreatedDate).getHours() +
              ":" +
              new Date(selectedOrder[0].orderCreatedDate).getMinutes()}
          </p>
          <p>
            <b>#{selectedOrder[0].orderId}</b>
          </p>
        </div>
        <div className="order-details-order-items-list">
          {selectedOrder[0].orderItems ? (
            selectedOrder[0].orderItems.map((orderItem) => (
              <OrderItemDetail
                key={orderItem.orderItemId}
                handleDeleteOrderItem={props.handleDeleteOrderItem}
                orderItem={orderItem}
                order={selectedOrder[0]}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="order-details-footer-drawer">
          <hr />
          <p>
            <span>Subtotal</span>
            <span>
              {rupiahWithoutDecimal(selectedOrder[0].totalOrderAmount)}
            </span>
          </p>
          <p>
            <span>Tax {selectedOrder[0].taxRate}%</span>
            <span>{rupiahWithoutDecimal(selectedOrder[0].taxAmount)}</span>
          </p>
          <p>
            <span>Service Charge {selectedOrder[0].serviceChargeRate}%</span>
            <span>
              {rupiahWithoutDecimal(selectedOrder[0].serviceChargeAmount)}
            </span>
          </p>
          <hr />
          <p>
            <span>
              <b>Total</b>
            </span>
            <span>
              <b>
                {rupiahWithoutDecimal(selectedOrder[0].finalTotalOrderAmount)}
              </b>
            </span>
          </p>
          <button id="payBtn" onClick={() => props.setPage(1)}>
            Pay - {rupiahWithoutDecimal(selectedOrder[0].finalTotalOrderAmount)}
          </button>

          <Popconfirm
            placement="top"
            title={"Are you sure want to delete?"}
            onConfirm={() => props.handleCancelOrder(selectedOrder[0])}
            okText="Yes"
            cancelText="No"
          >
            <button id="cancelOrderBtn">Cancel Order</button>
          </Popconfirm>
        </div>
      </div>
    )
  );
}

export default CashierOrderDetailsDrawerContent;
