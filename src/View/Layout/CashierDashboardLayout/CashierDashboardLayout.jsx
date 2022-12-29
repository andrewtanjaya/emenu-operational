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

function CashierDashboardLayout() {
  const searchKeyword = React.useContext(Context);
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const [categoryFilter, setCategoryFilter] = useState("");
  const [groupByCategoryData, setGroupByCategoryData] = useState(null);
  const [groupByTagData, setGroupByTagData] = useState(null);
  let startDate = new Date().setHours(0, 0, 0, 0);
  let endDate = new Date().setHours(23, 59, 59, 999);

  const [orders, isLoading, error] = useCollectionData(
    OrderController.getUnpaidOrderByRestaurantIdAndDateBetween(
      userSession.restaurantId,
      startDate,
      endDate
    ),
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
        foodData.filter((food) => food.categoryId.includes(categoryFilter))
      );
    } else if (categoryFilter === "RECOMMENDED") {
      setFilteredFood(
        foodData.filter((food) => food.tags.includes(categoryFilter))
      );
    } else {
      setFilteredFood(foodData);
    }
  }, [categoryFilter, foodData]);

  useEffect(() => {
    if (categoryData && !isCategoryLoad && foodData) {
      setGroupByCategoryData(groupBy(foodData, "categoryId"));
      setGroupByTagData(groupBy(foodData, "tags"));
    }
  }, [categoryData, foodData]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  useEffect(()=>{
    console.log(searchKeyword)
  }, [searchKeyword])

  return (
    <div className="cashier-dashboard-container">
      <h1>Order List</h1>
      <div className="cashier-dashboard-order-list-container">
        {!isLoading && orders ? (
          orders.map((order) => (
            <CashierOrderCard key={order.orderId} order={order} />
          ))
        ) : (
          <>Loading</>
        )}
      </div>
      <h1>Categories</h1>

      <div className="cashier-dashboard-category-list-container">
        <CashierCategoryCard
          categoryId=""
          setCategoryFilter={setCategoryFilter}
          active={categoryFilter === ""}
          icon="https://img.icons8.com/fluency/48/null/cake.png"
          categoryName="All Menu"
          countItem={foodData ? foodData.length : 0}
        />
        <CashierCategoryCard
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
