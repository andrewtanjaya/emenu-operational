import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search";
import "./ViewFoodLayout.css";
import { FoodController } from "../../../Controller/FoodController";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CategoryController } from "../../../Controller/CategoryController";

function ViewFoodLayout() {
  const columns = [
    {
      title: "Food Picture",
      dataIndex: "foodPictures",
      key: "foodPictures",
      width: "10%",
      render: (imgUrl) => (
        <div className="food-table-main-picture">
          <Image width={80} height={80} src={imgUrl[0]} fluid />
        </div>
      ),
    },
    {
      title: "Food Id",
      dataIndex: "foodId",
      key: "foodId",
      width: "12%",
    },
    {
      title: "Name",
      dataIndex: "foodName",
      key: "foodName",
      width: "28%",
    },
    {
      title: "Price",
      dataIndex: "foodPrice",
      key: "foodPrice",
      width: "10%",
      render: (price) => (
        <p>IDR. {price}</p>
      ),
    },
    {
      title: "Description",
      dataIndex: "foodDescription",
      key: "foodDescription",
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/editFood?foodId=${record.foodId}`}>Edit</Link>
          <Link
            onClick={() => {
              confirmDeleteModal(record.foodId);
            }}
          >
            Delete
          </Link>
        </Space>
      ),
    },
  ];
  const userSession = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [foodFiltered, setFoodFiltered] = useState(null);
  const [categories, isCategoryLoad, categoryError] = useCollectionData(
    CategoryController.getAllCategoriesByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );
  const [foods, isFoodLoad, foodError] = useCollectionData(
    FoodController.getAllFoodsByRestaurantId(userSession.restaurantId),
    {
      idField: "id",
    }
  );

  useEffect(() => {
    setIsLoad(true);
    if (!isFoodLoad) {
      setFoodFiltered(
        foods.filter((u) => {
          if (categoryFilter !== "") {
            if (keyword !== "") {
              return (
                u.categoryId.includes(categoryFilter) &&
                u.foodName.includes(keyword.toLowerCase())
              );
            }
            return u.categoryId.includes(categoryFilter);
          }
          return u.foodName.includes(keyword.toLowerCase());
        })
      );
      setIsLoad(false);
    }
  }, [foods, keyword, categoryFilter]);

  const confirmDeleteModal = (foodId) => {
    Modal.confirm({
      onOk: () => {
        FoodController.deleteFoodById(foodId);
      },
      centered: true,
      title: "Delete",
      content: "Are you sure want to delete this food?",
    });
  };
  return (
    <>
      <div className="view-food-container">
        <div className="food-header-container">
          <div className="add-food-button-container">
            <Button
              id="addButton"
              type="primary"
              onClick={() => {
                navigate("/admin/addFood");
              }}
            >
              Add Food
            </Button>
          </div>
          <div className="filter-food-container">
            <Select
              autoFocus
              placeholder="Category"
              style={{
                width: 200,
              }}
              allowClear
              options={
                !isCategoryLoad
                  ? categories.map((data) => {
                      return {
                        key: data.categoryId,
                        value: data.categoryId,
                        label: data.categoryName,
                      };
                    })
                  : null
              }
              onChange={(e) => {
                if (!e) {
                  setCategoryFilter("");
                } else {
                  setCategoryFilter(e);
                }
              }}
            />
            <Search
              placeholder="Search food name"
              style={{
                maxWidth: 600,
              }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="table-food-container">
          <Table
            columns={columns}
            loading={isLoad}
            dataSource={foodFiltered}
            rowKey="foodId"
            bordered
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20"],
            }}
            scroll={{
              x: 1200,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ViewFoodLayout;
