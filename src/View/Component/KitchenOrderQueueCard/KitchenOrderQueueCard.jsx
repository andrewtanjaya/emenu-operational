import React from "react";
import { useEffect } from "react";
import { OrderController } from "../../../Controller/OrderController";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import { FoodStatus } from "../../../Enum/FoodStatus";
import { OrderType } from "../../../Enum/OrderType";
import "./KitchenOrderQueueCard.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function KitchenOrderQueueCard(props) {
  function changeItemStatus(status, orderItemId) {
    let index = props.orderData.orderItems.findIndex(
      (obj) => obj.orderItemId === orderItemId
    );
    props.orderData.orderItems[index].orderItemStatus = status;
    OrderController.updateOrderItems(props.orderData).then(() => {
      let isOrderDone = props.orderData.orderItems.filter((data) => {
        return (
          data.orderItemStatus === FoodStatus.DELIVERED &&
          data.orderItemTimestamp === props.queueTimestamp
        );
      });
      if (props.orderQueueItemCount === isOrderDone.length) {
        OrderQueueController.deleteOrderQueueById(props.orderQueueId);
      }
    });
  }
  return (
    <div className="order-queue-card-container">
      <div
        className={
          props.orderItemType === OrderType.DINE_IN
            ? "order-queue-card-header dine-in-header"
            : "order-queue-card-header takeaway-header"
        }
      >
        <p>
          {props.orderItemType === OrderType.DINE_IN
            ? `DINE-IN • TABLE#${props.orderTable}`
            : `TAKEAWAY • ${
                props.orderType === OrderType.DINE_IN
                  ? `TABLE#${props.orderTable}`
                  : `QUEUE#${props.queueNumber}`
              }`}
        </p>
        <p>
          {props.date.getDate() +
            " " +
            months[props.date.getMonth()] +
            " " +
            props.date.getHours() +
            ":" +
            props.date.getMinutes()}
        </p>
      </div>
      {props.foods ? (
        props.foods.map((food) => {
          return (
            <div key={food.orderItemId} className="order-food-list">
              <div className="order-food-quantity">
                <b>{food.orderItemQuantity} x</b>
              </div>
              <div className="order-food-description">
                <p>
                  <b>{food.orderItemName}</b>
                </p>
                {food.orderItemOption ? (
                  food.orderItemOption.map((op) => {
                    return (
                      <div key={op.groupId}>
                        <p>
                          <b>{op.groupName}</b> : <i>{op.optionName}</i>
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
                <div>
                  <p>
                    <b>Notes</b> : <i>{food.orderItemNotes}</i>
                  </p>
                </div>
              </div>
              {food.orderItemStatus === FoodStatus.PLACED && (
                <div
                  className="change-order-status-button order-placed"
                  onClick={() => {
                    changeItemStatus(FoodStatus.PROCESSED, food.orderItemId);
                  }}
                >
                  <b>START COOK</b>
                </div>
              )}
              {food.orderItemStatus === FoodStatus.PROCESSED && (
                <div
                  className="change-order-status-button order-processed"
                  onClick={() => {
                    changeItemStatus(FoodStatus.READY, food.orderItemId);
                  }}
                >
                  <b>READY TO SERVE</b>
                </div>
              )}
              {food.orderItemStatus === FoodStatus.READY && (
                <div
                  className="change-order-status-button order-ready"
                  onClick={() => {
                    changeItemStatus(FoodStatus.DELIVERED, food.orderItemId);
                  }}
                >
                  <b>DELIVER</b>
                </div>
              )}
              {food.orderItemStatus === FoodStatus.DELIVERED && (
                <div className="change-order-status-button order-delivered">
                  <b>DELIVERED</b>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default KitchenOrderQueueCard;
