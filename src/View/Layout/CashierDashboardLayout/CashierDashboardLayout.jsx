import React, { useEffect } from "react";
import "./CashierDashboardLayout.css";
import CashierOrderCard from "../../Component/CashierOrderCard/CashierOrderCard";
import CashierCategoryCard from "../../Component/CashierCategoryCard/CashierCategoryCard";
import CashierMenuCard from "../../Component/CashierMenuCard/CashierMenuCard";
import { CategoryController } from "../../../Controller/CategoryController";
import { useState } from "react";
import { FoodController } from "../../../Controller/FoodController";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { OrderController } from "../../../Controller/OrderController";
import { Context } from "../../../Utils/CashierContext";
import OrderDetailDrawer from "../../Component/OrderDetailDrawer/OrderDetailDrawer";

function CashierDashboardLayout() {
  const searchKeyword = React.useContext(Context).searchKeyword;
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [categoryFilter, setCategoryFilter] = useState("");
  const [groupByCategoryData, setGroupByCategoryData] = useState(null);
  const [groupByTagData, setGroupByTagData] = useState(null);

  const [openOrderDetailDrawer, setOpenOrderDetailDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const onOrderDetailDrawerClose = () => {
    setOpenOrderDetailDrawer(false);
  };
  const showOrderDetailDrawer = (order) => {
    setSelectedOrder(order);
    setOpenOrderDetailDrawer(true);
  };

  const [orders, isLoading, error] = useCollectionData(
    OrderController.getUnpaidOrderByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );
  const [categoryData, isCategoryLoad, categoryError] = useCollectionData(
    CategoryController.getAllCategoriesByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );
  const [foodData, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );
  const [filteredFood, setFilteredFood] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);

  var groupBy = function (targetArr, key) {
    return targetArr.reduce(function (arr, data) {
      data[key].forEach((categoryId) => {
        (arr[categoryId] = arr[categoryId] || []).push(data);
      });

      return arr;
    }, {});
  };

  useEffect(() => {
    if (categoryFilter && foodData && categoryFilter !== "RECOMMENDED") {
      setFilteredFood(
        foodData.filter(
          (food) =>
            food.categoryId.includes(categoryFilter) &&
            food.foodName.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    } else if (categoryFilter === "RECOMMENDED") {
      setFilteredFood(
        foodData.filter(
          (food) =>
            food.tags.includes(categoryFilter) &&
            food.foodName.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    } else {
      setFilteredFood(
        foodData
          ? foodData.filter((food) =>
              food.foodName.toLowerCase().includes(searchKeyword.toLowerCase())
            )
          : foodData
      );
      setFilteredOrder(
        orders
          ? orders.filter((order) =>
              order.orderId.toLowerCase().includes(searchKeyword.toLowerCase())
            )
          : orders
      );
    }
  }, [categoryFilter, foodData, searchKeyword]);

  useEffect(() => {
    if (categoryData && !isCategoryLoad && filteredFood) {
      setGroupByCategoryData(groupBy(filteredFood, "categoryId"));
      setGroupByTagData(groupBy(filteredFood, "tags"));
    }
  }, [categoryData, filteredFood]);

  useEffect(() => {
    console.log("orders", orders);
    if (orders) {
      setFilteredOrder(
        orders.filter((order) =>
          order.orderId.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    }
  }, [orders]);

  return (
    <div className="cashier-dashboard-container">
      <OrderDetailDrawer
        allOrder={orders}
        selectedOrder={selectedOrder}
        open={openOrderDetailDrawer}
        onClose={onOrderDetailDrawerClose}
      />
      <h1>Order List</h1>
      <div className="cashier-dashboard-order-list-container">
        {!isLoading && filteredOrder ? (
          filteredOrder.map((order) =>
            order.orderItems.length ? (
              <CashierOrderCard
                showOrderDetailDrawer={showOrderDetailDrawer}
                key={order.orderId}
                order={order}
              />
            ) : (
              <></>
            )
          )
        ) : (
          <>Loading</>
        )}
      </div>
      <h1>Categories</h1>

      <div className="cashier-dashboard-category-list-container">
        <CashierCategoryCard
          key="all"
          categoryId=""
          setCategoryFilter={setCategoryFilter}
          active={categoryFilter === ""}
          icon="https://img.icons8.com/fluency/48/null/cake.png"
          categoryName="All Menu"
          countItem={filteredFood ? filteredFood.length : 0}
        />
        <CashierCategoryCard
          key="recommended"
          categoryId="RECOMMENDED"
          setCategoryFilter={setCategoryFilter}
          active={categoryFilter === "RECOMMENDED"}
          icon="https://img.icons8.com/fluency/48/null/cake.png"
          categoryName="Recommended"
          countItem={
            groupByTagData && groupByTagData["RECOMMENDED"]
              ? groupByTagData["RECOMMENDED"].length
              : 0
          }
        />
        {categoryData && !isCategoryLoad ? (
          categoryData.map((category) => {
            return (
              <CashierCategoryCard
                active={categoryFilter === category.categoryId}
                categoryId={category.categoryId}
                setCategoryFilter={setCategoryFilter}
                key={category.categoryId}
                icon={category.categoryIcon}
                categoryName={category.categoryName}
                countItem={
                  groupByCategoryData &&
                  groupByCategoryData[category.categoryId]
                    ? groupByCategoryData[category.categoryId].length
                    : 0
                }
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <h1>Menus</h1>
      <div className="cashier-dashboard-menu-list-container">
        {/* <CashierMenuCard
          foodName="Grilled Cheese Salad with mentai sauce"
          foodPrice="20.000"
          foodImage="https://p4.wallpaperbetter.com/wallpaper/667/630/482/burger-dinner-food-hamburger-wallpaper-preview.jpg"
        /> */}
        {filteredFood && !isFoodLoad ? (
          filteredFood.map((food) => (
            <CashierMenuCard
              key={food.foodId}
              foodName={food.foodName}
              foodPrice={food.foodPrice}
              foodImage={food.foodPictures[0]}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default CashierDashboardLayout;
