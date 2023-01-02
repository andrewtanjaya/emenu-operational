import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { OrderController } from "../../../Controller/OrderController";
import { OrderQueueController } from "../../../Controller/OrderQueueController";
import KitchenOrderQueueGroup from "../../Component/KitchenOrderQueueGroup/KitchenOrderQueueGroup";
import "./KitchenOrderQueueLayout.css";

function KitchenOrderQueueLayout() {
  const [dataOrder, setDataOrder] = useState({});
  let data = [
    {
      orderId: "TRX-123456789",
      orderTable: null,
      orderQueueNumber: 10,
      restaurantId: "RES-0001",
      orderPlacedTimestamp: "1",
    },
    {
      orderId: "TRX-123456789",
      orderTable: 15,
      orderQueueNumber: null,
      restaurantId: "RES-0001",
      orderPlacedTimestamp: "1",
    },
    {
      orderId: "TRX-123456781",
      orderTable: 15,
      orderQueueNumber: null,
      restaurantId: "RES-0001",
      orderPlacedTimestamp: "2",
    },
    {
      orderId: "TRX-123456782",
      orderTable: null,
      orderQueueNumber: 1,
      restaurantId: "RES-0001",
      orderPlacedTimestamp: "3",
    },
    {
      orderId: "TRX-123456783",
      orderTable: 2,
      orderQueueNumber: null,
      restaurantId: "RES-0001",
      orderPlacedTimestamp: "6",
    },
  ];

  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [orders, isOrderLoading, orderError] = useCollectionData(
    OrderController.getAllOrderByRestaurantIdQuery(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  const [orderQueue, isOrderQueueLoading, orderQueueError] = useCollectionData(
    OrderQueueController.getAllOrderQueueByRestaurantIdQuery(
      userSession.restaurantId
    ),
    {
      idField: "id",
    }
  );

  const [sortedQueue, setSortedQueue] = useState([]);
  useEffect(() => {
    if (!isOrderQueueLoading) {
      let sortedOrderQueue = orderQueue.sort(
        (a, b) => a.orderPlacedTimestamp - b.orderPlacedTimestamp
      );

      setSortedQueue(sortedOrderQueue);
    }
  }, [orderQueue]);

  return (
    !isOrderLoading &&
    sortedQueue.length > 0 && (
      <div className="order-queue-wrapper">
        <h1>ORDER QUEUE LIST</h1>
        <div className="order-queue-container">
          {sortedQueue.map((queueData) => {
            let orderData = orders.filter((data) => {
              return data.orderId === queueData.orderId;
            });

            return (
              <KitchenOrderQueueGroup
                key={queueData.orderQueueId}
                queueData={queueData}
                orderData={orderData[0]}
              ></KitchenOrderQueueGroup>
            );
          })}
        </div>
      </div>
    )
  );
}

export default KitchenOrderQueueLayout;
