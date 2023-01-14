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
import AddFoodDrwaer from "../../Component/AddFoodDrawer/AddFoodDrawer";
import AddFoodDrawer from "../../Component/AddFoodDrawer/AddFoodDrawer";
import { Button, Drawer, Space } from "antd";

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
      setGroupByCategoryData(groupBy(foodData, "categoryId"));
      setGroupByTagData(groupBy(foodData, "tags"));
    }
  }, [categoryData, filteredFood]);

  useEffect(() => {
    if (orders) {
      setFilteredOrder(
        orders.filter((order) =>
          order.orderId.toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    }
  }, [orders]);

  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const onClose = () => {
    setOpen(false);
  };
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
          icon="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Finfinity_267e-fe0f.png?alt=media&token=156483b8-58b0-430a-96c6-0abee64299dc"
          categoryName="All Menu"
          countItem={foodData ? foodData.length : 0}
        />
        <CashierCategoryCard
          key="recommended"
          categoryId="RECOMMENDED"
          setCategoryFilter={setCategoryFilter}
          active={categoryFilter === "RECOMMENDED"}
          icon="https://firebasestorage.googleapis.com/v0/b/e-menu-appcation.appspot.com/o/category-icon%2Fthumbs-up_1f44d.png?alt=media&token=5c7be981-e1df-44fe-9bd7-683dc4e00f80"
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
            <>
              <CashierMenuCard
                key={food.foodId}
                foodName={food.foodName}
                foodPrice={food.foodPrice}
                foodImage={food.foodPictures[0]}
                setOpen={setOpen}
                food={food}
                setSelectedFood={setSelectedFood}
              />
            </>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Drawer
        className="atc-drawer"
        placement="right"
        width={450}
        onClose={onClose}
        closable={false}
        open={open}
      >
        {selectedFood && (
          <>
            <div className="add-to-cart-drawer-container">
              <AddFoodDrawer
                foodData={selectedFood}
                setOpen={setOpen}
              ></AddFoodDrawer>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}

export default CashierDashboardLayout;
