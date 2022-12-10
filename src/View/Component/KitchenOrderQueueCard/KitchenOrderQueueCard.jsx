import React from "react";
import { useEffect } from "react";
import "./KitchenOrderQueueCard.css";

function KitchenOrderQueueCard({ data }) {
  useEffect(() => {
    console.log("tested", data);
  }, [data]);
  const foods = [
    {
      itemId: "DKS-001",
      itemName: "Nasi Goreng Ayam",
      status: "PROCESSED || READY || DELIVERED",
      price: 18000,
      quantity: 2,
      notes: "jangan pedas ya!",
      orderPlacedTimeStamps: 1887877,
      option: [
        {
          groupName: "Porsi",
          option: "Besar",
          addedValue: 4000,
        },
        {
          groupName: "Level Pedas",
          option: "5",
          addedValue: 0,
        },
        {
          groupName: "Toppings",
          option: "Telur Ceplok",
          addedValue: 5000,
        },
        {
          groupName: "Toppings",
          option: "Kerupuk Udang",
          addedValue: 1000,
        },
      ],
      totalPrice: 36000,
      totalAddedValue: 20000,
      totalPriceAndAddedValue: 56000,
    },
    {
      itemId: "DKS-001",
      itemName: "Kwetiau Goreng Sapi",
      status: "PROCESSED || READY || DELIVERED",
      price: 25000,
      quantity: 2,
      notes: "jangan pedas ya!",
      orderPlacedTimeStamps: 1887877,
      option: [
        {
          groupName: "Porsi",
          option: "Normal",
          addedValue: 0,
        },
        {
          groupName: "Level Pedas",
          option: "5",
          addedValue: 0,
        },
        {
          groupName: "Toppings",
          option: "Telur Ceplok",
          addedValue: 5000,
        },
        {
          groupName: "Toppings",
          option: "Extra Kerupuk",
          addedValue: 1000,
        },
      ],
      totalPrice: 50000,
      totalAddedValue: 12000,
      totalPriceAndAddedValue: 62000,
    },
  ];
  return (
    <div className="order-queue-card-container">
      <div  className={data.orderTable? "order-queue-card-header dine-in-header" : "order-queue-card-header takeaway-header"}>
        <p>
          {data.orderTable
            ? `DINE-IN • TABLE#${data.orderTable}`
            : `TAKEAWAY • QUEUE#${data.orderQueueNumber}`}
        </p>
        <p>{data.orderPlacedTimestamp}</p>
      </div>
      {foods ? (
        foods.map((food) => {
          return (
            <div className="order-food-list">
              <div className="order-food-quantity"><b>{food.quantity} x</b></div>
              <div className="order-food-description">
                <p><b>{food.itemName}</b></p>
                {food.option ? (
                  food.option.map((op) => {
                    return (
                      <div>
                        <p>
                        <b>{op.groupName}</b> : <i>{op.option}</i>
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
                
              </div>
              <div className="change-order-status-button on-progress"><b>COOK</b></div>
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
