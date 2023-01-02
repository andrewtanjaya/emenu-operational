import React, { useState } from "react";
import { useEffect } from "react";
import { OrderController } from "../../../Controller/OrderController";
import { OrderSummaryController } from "../../../Controller/OrderSummaryController";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import CashPaymentMethodDetail from "../CashPaymentMethodDetail/CashPaymentMethodDetail";
import "./CashierPaymentDrawerContent.css";

function CashierPaymentDrawerContent(props) {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [isError, setIsError] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});

  const verifyPayment = () => {
    let updatedOrder = props.order;
    updatedOrder.orderPaymentStatus = PaymentStatus.PAID;
    let payMethod = props.paymentMethod;
    if (props.paymentMethod === "Others") {
      payMethod =
        "Others (" + document.getElementById("otherPaymentMethod").value + ")";
    }
    updatedOrder.paymentMethod = payMethod;
    updatedOrder.orderPaidDate = Date.now();
    updatedOrder.orderCheckoutBy = userSession.email;
    OrderController.updateOrder(updatedOrder).then(() => {
      resetCounterIfAllPaid();
      generateSummaryMenuRanking();
    });
  };

  const resetCounterIfAllPaid = () => {
    if (props.allOrder) {
      let isAllPaid = true;
      props.allOrder.forEach((order) => {
        if (order.orderPaymentStatus === "UNPAID") {
          isAllPaid = false;
          return;
        }
      });
      if (isAllPaid) {
        RestaurantController.updateOrderCounter(userSession.restaurantId, 0);
      }
    }
  };
  const generateSummaryMenuRanking = () => {
    let soldItemSummary = {};
    for (let i = 0; i < props.order.orderItems.length; i++) {
      if (soldItemSummary[props.order.orderItems[i].orderItemId.slice(0, 12)]) {
        soldItemSummary[
          props.order.orderItems[i].orderItemId.slice(0, 12)
        ].totalSoldQty += props.order.orderItems[i].orderItemQuantity;
        soldItemSummary[
          props.order.orderItems[i].orderItemId.slice(0, 12)
        ].totalSales += props.order.orderItems[i].subTotalPrice;
      } else {
        soldItemSummary[props.order.orderItems[i].orderItemId.slice(0, 12)] = {
          totalSoldQty: props.order.orderItems[i].orderItemQuantity,
          totalSales: props.order.orderItems[i].subTotalPrice,
        };
      }
    }

    let payMethod = props.paymentMethod;
    if (props.paymentMethod === "Others") {
      payMethod =
        "Others (" + document.getElementById("otherPaymentMethod").value + ")";
    }

    let orderSummary = {
      orderSummaryId: props.order.orderId,
      orderPaidDate: new Date().getTime(),
      soldItemSummary: soldItemSummary,
      taxAmount: props.order.taxAmount,
      serviceChargeAmount: props.order.serviceChargeAmount,
      totalOrderAmount: props.order.totalOrderAmount,
      finalTotalOrderAmount: props.order.finalTotalOrderAmount,
      paymentMethod: payMethod,
    };

    OrderSummaryController.addOrderSummary(orderSummary);
    props.setPage(2);
  };

  useEffect(() => {
    RestaurantController.getRestaurantById(userSession.restaurantId).then(
      (restaurant) => {
        setRestaurantData(restaurant);
      }
    );
  }, []);
  return (
    <div className="order-details-drawer-container">
      <div className="payment-method-content">
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
          <span>IDR. {props.order.serviceChargeAmount}</span>
        </p>
        <hr />
        <p style={{ margin: "4px 0px" }}>
          <span>
            <b>Total</b>
          </span>
          <span>
            <b>IDR. {props.order.finalTotalOrderAmount}</b>
          </span>
        </p>
        <hr />

        <p style={{ marginTop: "10px" }}>Choose Payment Methods :</p>
        {isError ? (
          <p style={{ color: "red", marginTop: "-10px" }}>
            <i>Please choose at least one payment methods to proceed!</i>
          </p>
        ) : (
          <></>
        )}
        <div className="radio-button-payment-method">
          <input
            type="radio"
            id=""
            name="paymentMethod"
            value="Cash"
            onChange={() => props.setPaymentMethod("Cash")}
          />
          <label for="Cash">Cash</label>
        </div>
        <div className="radio-button-payment-method">
          <input
            type="radio"
            id=""
            name="paymentMethod"
            value="Qris"
            onChange={() => props.setPaymentMethod("Qris")}
          />
          <label for="Qris">QRIS</label>
        </div>
        <div className="radio-button-payment-method">
          <input
            type="radio"
            id=""
            name="paymentMethod"
            value="Others"
            onChange={() => props.setPaymentMethod("Others")}
          />
          <input
            className="other-payment-method-input"
            type="text"
            name="otherPaymentMethod"
            id="otherPaymentMethod"
            placeholder="others"
          />
        </div>

        <div className="payment-method-detail-container">
          {props.paymentMethod === "Cash" ? (
            <CashPaymentMethodDetail
              grandTotal={props.order.finalTotalOrderAmount}
            />
          ) : props.paymentMethod === "Qris" ? (
            <div className="qris-payment-method-container">
              <p>
                <b>QRIS</b>
              </p>
              <hr />
              {restaurantData && restaurantData.restaurantQris ? (
                <img src={restaurantData.restaurantQris} alt="" />
              ) : (
                <p>Please contact admin to insert QRIS first</p>
              )}
              <p>
                <b>IDR. {props.order.finalTotalOrderAmount}</b>
              </p>
              <p>Please scan QRIS above</p>
              <button
                id="secondary-button-drawer"
                style={{ padding: "8px 16px" }}
              >
                Print QR
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={() => {
            if (props.paymentMethod) {
              verifyPayment();
            } else {
              setIsError(true);
            }
          }}
        >
          Verify Payment
        </button>
        <button onClick={() => props.setPage(0)} id="secondary-button-drawer">
          Back
        </button>
      </div>
    </div>
  );
}

export default CashierPaymentDrawerContent;
