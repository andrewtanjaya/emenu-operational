import React, { useState } from "react";
import { useEffect } from "react";
import ReactToPrint from "react-to-print";
import { FoodController } from "../../../Controller/FoodController";
import { OrderController } from "../../../Controller/OrderController";
import { OrderSummaryController } from "../../../Controller/OrderSummaryController";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import { rupiahWithDecimal } from "../../../Helper/Helper";
import CashPaymentMethodDetail from "../CashPaymentMethodDetail/CashPaymentMethodDetail";
import "./CashierPaymentDrawerContent.css";

function CashierPaymentDrawerContent(props) {
  let componentRef;
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [isError, setIsError] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});
  const [selectedOrder, setSelectedOrder] = useState([]);
  const verifyPayment = () => {
    let updatedOrder = selectedOrder[0];
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
      generateSummaryMenuRankingAndUpdateFoodData(payMethod);
    });
  };

  const updateFoodTotalOrderQuantity = () => {
    let soldItemSummary = {};
    for (let i = 0; i < selectedOrder[0].orderItems.length; i++) {
      if (
        soldItemSummary[selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)]
      ) {
        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ].totalSoldQty += selectedOrder[0].orderItems[i].orderItemQuantity;
        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ].totalSales += selectedOrder[0].orderItems[i].subTotalPrice;
      } else {
        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ] = {
          totalSoldQty: selectedOrder[0].orderItems[i].orderItemQuantity,
          totalSales: selectedOrder[0].orderItems[i].subTotalPrice,
        };
      }
    }
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
  const generateSummaryMenuRankingAndUpdateFoodData = (paymentMethod) => {
    let soldItemSummary = {};
    for (let i = 0; i < selectedOrder[0].orderItems.length; i++) {
      if (
        soldItemSummary[selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)]
      ) {
        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ].totalSoldQty += selectedOrder[0].orderItems[i].orderItemQuantity;

        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ].totalSales +=
          selectedOrder[0].orderItems[i].orderItemPrice *
          selectedOrder[0].orderItems[i].orderItemQuantity;
      } else {
        soldItemSummary[
          selectedOrder[0].orderItems[i].orderItemId.slice(0, 12)
        ] = {
          totalSoldQty: selectedOrder[0].orderItems[i].orderItemQuantity,
          totalSales:
            selectedOrder[0].orderItems[i].orderItemPrice *
            selectedOrder[0].orderItems[i].orderItemQuantity,
        };
      }
    }
    let soldItemSummaryMap = new Map(Object.entries(soldItemSummary));

    soldItemSummaryMap.forEach((value, key) => {
      FoodController.getFoodById(key).then((resp) => {
        FoodController.updateFoodSoldQuantity(
          key,
          resp.orderCount + value.totalSoldQty,
          resp.totalSold + value.totalSales
        );
      });
    });

    let orderSummary = {
      orderSummaryId: selectedOrder[0].orderId,
      restaurantId: selectedOrder[0].restaurantId,
      orderPaidDate: new Date().getTime(),
      soldItemSummary: Object.assign({}, soldItemSummary),
      taxAmount: selectedOrder[0].taxAmount,
      serviceChargeAmount: selectedOrder[0].serviceChargeAmount,
      totalOrderAmount: selectedOrder[0].totalOrderAmount,
      finalTotalOrderAmount: selectedOrder[0].finalTotalOrderAmount,
      paymentMethod: paymentMethod,
    };

    OrderSummaryController.addOrderSummary(orderSummary).then(() => {
      props.setPage(2);
    });
  };

  useEffect(() => {
    RestaurantController.getRestaurantById(userSession.restaurantId).then(
      (restaurant) => {
        setRestaurantData(restaurant);
      }
    );
  }, []);

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
        <div className="payment-method-content">
          <p>
            <span>Subtotal</span>
            <span>{rupiahWithDecimal(selectedOrder[0].totalOrderAmount)}</span>
          </p>
          <p>
            <span>Tax {selectedOrder[0].taxRate}%</span>
            <span>{rupiahWithDecimal(selectedOrder[0].taxAmount)}</span>
          </p>
          <p>
            <span>Service Charge {selectedOrder[0].serviceChargeRate}%</span>
            <span>
              {rupiahWithDecimal(selectedOrder[0].serviceChargeAmount)}
            </span>
          </p>
          <hr />
          <p style={{ margin: "4px 0px" }}>
            <span>
              <b>Total</b>
            </span>
            <span>
              <b>{rupiahWithDecimal(selectedOrder[0].finalTotalOrderAmount)}</b>
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
                grandTotal={selectedOrder[0].finalTotalOrderAmount}
              />
            ) : props.paymentMethod === "Qris" ? (
              <div className="qris-payment-method-container">
                <p>
                  <b>QRIS</b>
                </p>
                <hr />
                {restaurantData && restaurantData.restaurantQris ? (
                  <img
                    ref={(el) => (componentRef = el)}
                    src={restaurantData.restaurantQris}
                    alt=""
                  />
                ) : (
                  <p>Please contact admin to insert QRIS first</p>
                )}
                <p>
                  <b>
                    {rupiahWithDecimal(selectedOrder[0].finalTotalOrderAmount)}
                  </b>
                </p>
                <p>Please scan QRIS above</p>
                <ReactToPrint
                  trigger={() => {
                    return (
                      <button
                        id="secondary-button-drawer"
                        style={{ padding: "8px 16px" }}
                      >
                        Print QR
                      </button>
                    );
                  }}
                  content={() => componentRef}
                  pageStyle="print"
                />
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
    )
  );
}

export default CashierPaymentDrawerContent;
