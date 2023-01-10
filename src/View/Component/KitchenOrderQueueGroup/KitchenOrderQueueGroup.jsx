import React, { useEffect } from "react";
import { useState } from "react";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import { OrderType } from "../../../Enum/OrderType";
import { PaymentStatus } from "../../../Enum/PaymentStatus";
import KitchenOrderQueueCard from "../KitchenOrderQueueCard/KitchenOrderQueueCard";
import "./KitchenOrderQueueGroup.css";

function KitchenOrderQueueGroup(props) {
  const [dineInItems, setDineInItems] = useState([]);
  const [takeawayItems, setTakeawayItems] = useState([]);
  useEffect(() => {
    let dineIn = props.orderData.orderItems.filter((data) => {
      return (
        data.orderItemType === OrderType.DINE_IN &&
        data.orderItemTimestamp === props.queueData.orderPlacedTimestamp
      );
    });

    let takeaway = props.orderData.orderItems.filter((data) => {
      return (
        data.orderItemType === OrderType.TAKEAWAY &&
        data.orderItemTimestamp === props.queueData.orderPlacedTimestamp
      );
    });
    if (
      dineIn.length + takeaway.length === 0 ||
      props.orderData.orderPaymentStatus === PaymentStatus.CANCELED
    ) {
      OrderQueueController.deleteOrderQueueById(props.queueData.orderQueueId);
    }
    setDineInItems(dineIn);
    setTakeawayItems(takeaway);
  }, [props.orderData, props.queueData]);

  return (
    <div className="order-queue-group-container">
      {dineInItems.length > 0 && (
        <KitchenOrderQueueCard
          foods={dineInItems}
          date={new Date(props.queueData.orderPlacedTimestamp)}
          orderQueueId={props.queueData.orderQueueId}
          orderItemType={OrderType.DINE_IN}
          orderType={props.orderData.orderType}
          queueNumber={props.orderData.orderQueue}
          orderTable={props.orderData.orderTable}
          orderData={props.orderData}
          orderQueueItemCount={dineInItems.length + takeawayItems.length}
          queueTimestamp={props.queueData.orderPlacedTimestamp}
        />
      )}
      {takeawayItems.length > 0 && (
        <KitchenOrderQueueCard
          foods={takeawayItems}
          date={new Date(props.queueData.orderPlacedTimestamp)}
          orderQueueId={props.queueData.orderQueueId}
          orderItemType={OrderType.TAKEAWAY}
          orderType={props.orderData.orderType}
          queueNumber={props.orderData.orderQueue}
          orderTable={props.orderData.orderTable}
          orderData={props.orderData}
          orderQueueItemCount={dineInItems.length + takeawayItems.length}
          queueTimestamp={props.queueData.orderPlacedTimestamp}
        />
      )}
      {dineInItems.length + takeawayItems.length > 0 && (
        <div className="order-queue-group-footer">
          <p>
            <b>#{props.orderData.orderId}</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default KitchenOrderQueueGroup;
