import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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

  useEffect(() => {
    setDataOrder(
      data.reduce((group, order) => {
        const { orderPlacedTimestamp } = order;
        group[orderPlacedTimestamp] = group[orderPlacedTimestamp] ?? [];
        group[orderPlacedTimestamp].push(order);
        return group;
      }, {})
    );
  }, []);

  return (
    <div className="order-queue-wrapper">
      <h1>ORDER QUEUE LIST</h1>
      <div className="order-queue-container">
        {dataOrder ? (
          Object.entries(dataOrder).map((d) => {
            return <KitchenOrderQueueGroup data={d} />;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default KitchenOrderQueueLayout;
