import { Button, Drawer, Space } from "antd";
import React, { useState } from "react";
import { OrderController } from "../../../Controller/OrderController";
import CashierOrderDetailsDrawerContent from "../CashierOrderDetailsDrawerContent/CashierOrderDetailsDrawerContent";
import CashierPaymentDrawerContent from "../CashierPaymentDrawerContent/CashierPaymentDrawerContent";
import CashierThankyouDrawerContent from "../CashierThankyouDrawerContent/CashierThankyouDrawerContent";

function OrderDetailDrawer(props) {
  const [page, setPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleDeleteOrderItem = (orderItemId) => {
    let updatedOrder = props.selectedOrder;
    updatedOrder.orderItems = updatedOrder.orderItems.filter(
      (orderItem) => orderItem.orderItemId !== orderItemId
    );
    console.log(updatedOrder);
    OrderController.updateOrder(props.selectedOrder);
    console.log(orderItemId);
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
            page={page}
            setPage={setPage}
            handleDeleteOrderItem={handleDeleteOrderItem}
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
