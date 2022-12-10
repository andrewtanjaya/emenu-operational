import { Image, Switch, Table } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FoodController } from "../../../Controller/FoodController";
import "./CashierKitchenUpdateMenuAvailableLayout.css";

function CashierKitchenUpdateMenuAvailableLayout() {
  const currentUser = JSON.parse(sessionStorage.getItem("userData"));
  const [searchKeyword, setSearchKeyword] = useState("");

  const onChange = (checked, foodId) => {
    FoodController.updateFoodAvailability(foodId, checked);
  };

  const resetFoodsData = () => {
    if (foods && !isFoodLoad) {
      let tempFoodData = [];
      for (let i = 0; i < foods.length; i++) {
        let food = {
          foodId: foods[i].foodId,
          key: i + "",
          mainPicture: foods[i].foodPictures[0],
          foodName: foods[i].foodName,
          totalSales: foods[i].totalSales,
          foodPrice: foods[i].foodPrice,
          foodAvailability: foods[i].foodAvailability,
        };
        tempFoodData = [...tempFoodData, food];
      }
      setFoodsData(tempFoodData);
    }
  };

  const [foodsData, setFoodsData] = useState([]);

  const [foods, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(currentUser.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    resetFoodsData();
  }, [foods]);

  useEffect(() => {
    if (searchKeyword !== "") {
      let result = foods.filter((food) =>
        food.foodName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      let tempResultData = [];
      for (let i = 0; i < result.length; i++) {
        let food = {
          foodId: result[i].foodId,
          key: i + "",
          mainPicture: result[i].foodPictures[0],
          foodName: result[i].foodName,
          totalSales: result[i].totalSales,
          foodPrice: result[i].foodPrice,
          foodAvailability: result[i].foodAvailability,
        };
        tempResultData = [...tempResultData, food];
      }
      setFoodsData(tempResultData);
    } else {
      resetFoodsData();
    }
  }, [searchKeyword]);

  const columnsTemplate = [
    {
      title: "Main Picture",
      dataIndex: "mainPicture",
      key: "mainPicture",
      render: (_, record) => (
        <div>
          <Image width={90} height={90} src={record.mainPicture} fluid />
        </div>
      ),
      width: "10%",
    },
    {
      title: "Food Name",
      dataIndex: "foodName",
      key: "foodName",
      width: "60%",
    },
    {
      title: "Total Sold",
      dataIndex: "totalSales",
      key: "totalSales",
      sorter: {
        compare: (a, b) => a.totalSales - b.totalSales,
        multiple: 1,
      },
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "foodPrice",
      key: "foodPrice",
      sorter: {
        compare: (a, b) => a.foodPrice - b.foodPrice,
        multiple: 2,
      },
      width: "20%",
    },
    {
      title: "Availability",
      dataIndex: "foodAvailability",
      key: "foodAvailability",
      render: (_, record) => (
        <div className="update-availability-action-container">
          <Switch
            checked={record.foodAvailability}
            onChange={(checked) => onChange(checked, record.foodId)}
          />
        </div>
      ),
      width: "10%",
    },
  ];

  return (
    <div className="update-food-available-container">
      <h1>MENU LIST</h1>
      <div className="search-menu-availability">
        <input
          className="search-menu-availability-input"
          type="text"
          name="search-menu"
          id=""
          placeholder="Search for menu.."
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      <div className="update-food-available-table-container">
        <Table
          loading={isFoodLoad}
          columns={columnsTemplate}
          dataSource={foodsData}
          bordered
          pagination={{
            defaultPageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ["3", "10", "50", "100"],
          }}
        />
      </div>
    </div>
  );
}

export default CashierKitchenUpdateMenuAvailableLayout;
