import { async } from "@firebase/util";
import { Button, Drawer, Space } from "antd";
import React, { useState } from "react";
import { OrderController } from "../../../Controller/OrderController";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import CashierOrderDetailsDrawerContent from "../CashierOrderDetailsDrawerContent/CashierOrderDetailsDrawerContent";
import CashierPaymentDrawerContent from "../CashierPaymentDrawerContent/CashierPaymentDrawerContent";
import CashierThankyouDrawerContent from "../CashierThankyouDrawerContent/CashierThankyouDrawerContent";

function OrderDetailDrawer(props) {
  const [page, setPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  function calculateTotalPrice(orderItem) {
    let totalPrice = 0;
    orderItem.forEach((item) => {
      totalPrice += item.subTotalPrice;
    });
    return totalPrice;
  }

  const handleDeleteOrderItem = (orderItemId, order) => {
    let updatedOrder = order;
    updatedOrder.orderItems = updatedOrder.orderItems.filter(
      (orderItem) => orderItem.orderItemId !== orderItemId
    );
    let totalOrderAmount = calculateTotalPrice(updatedOrder.orderItems);
    updatedOrder.totalOrderAmount = totalOrderAmount;
    updatedOrder.serviceChargeAmount =
      totalOrderAmount * (updatedOrder.serviceChargeRate / 100);
    updatedOrder.taxAmount = totalOrderAmount * (updatedOrder.taxRate / 100);
    updatedOrder.finalTotalOrderAmount =
      totalOrderAmount +
      updatedOrder.serviceChargeAmount +
      updatedOrder.taxAmount;
    OrderController.updateOrderItems(updatedOrder);
  };

  const handleCancelOrder = (order) => {
    OrderQueueController.getAllOrderQueueByOrderId(order.orderId).then(
      (resp) => {
        setPage(0);
        setPaymentMethod("");
        props.onClose();
        //UPDATE ORDER STATUS CANCELED
        order.orderPaymentStatus = PaymentStatus.CANCELED;
        OrderController.updateOrder(order);
        //DELETE ALL ORDER QUEUE RELATED TO THIS ORDER
        resp.forEach((doc) => {
          OrderQueueController.deleteOrderQueueById(doc.data().orderQueueId);
        });
      }
    );
  };

  return (
    <div>
      <Drawer
        title={
          page === 0
            ? "Order Detail"
            : page === 1
            ? "Payment"
            : page === 2
            ? "Thank you"
            : "none"
        }
        placement="right"
        width={500}
        onClose={() => {
          setPage(0);
          setPaymentMethod("");
          props.onClose();
        }}
        open={props.open}
      >
        {page === 0 ? (
          <CashierOrderDetailsDrawerContent
            allOrder={props.allOrder}
            page={page}
            setPage={setPage}
            handleDeleteOrderItem={handleDeleteOrderItem}
            handleCancelOrder={handleCancelOrder}
            order={props.selectedOrder}
          />
        ) : page === 1 ? (
          <CashierPaymentDrawerContent
            allOrder={props.allOrder}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            page={page}
            setPage={setPage}
            order={props.selectedOrder}
          />
        ) : page === 2 ? (
          <CashierThankyouDrawerContent orderId={props.selectedOrder.orderId} />
        ) : (
          <>Not Found</>
        )}
      </Drawer>
    </div>
  );
}

export default OrderDetailDrawer;
