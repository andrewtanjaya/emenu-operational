import React, { useState } from "react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { OrderController } from "../../../Controller/OrderController";
import { Context } from "../../../Utils/CashierContext";
import CashierOrderCard from "../../Component/CashierOrderCard/CashierOrderCard";
import "./CashierOrderListLayout.css";

function CashierOrderListLayout() {
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const searchKeyword = React.useContext(Context).searchKeyword;
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, isLoading, error] = useCollectionData(
    OrderController.getUnpaidOrderByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    setFilteredOrders(
      orders ? orders.filter((order) =>
        order.orderId.toLowerCase().includes(searchKeyword.toLowerCase())
      ) : orders
    );
  }, [orders, searchKeyword]);
  return (
    <div className="cashier-order-list-container">
      {!isLoading && filteredOrders ? (
        filteredOrders.map((order) => (
          <CashierOrderCard key={order.orderId} order={order} />
        ))
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default CashierOrderListLayout;
