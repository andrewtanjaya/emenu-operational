import React, { useEffect, useState } from "react";
import { Space, Table, Modal, Select, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserController } from "../../../Controller/UserController";
import Search from "antd/es/input/Search";
import ViewFoodLayout from "../ViewFoodLayout/ViewFoodLayout";
import ViewCategoryLayout from "../ViewCategoryLayout/ViewCategoryLayout";
import "./ViewMenuLayout.css";

function ViewMenuLayout() {
  const [isCategory, setIsCategory] = useState(false);
  const [isFood, setIsFood] = useState(true);

  const onClikNavBtn = (value) => {
    if (value === "FOOD") {
      setIsFood(true);
      setIsCategory(false);
    } else if (value === "CATEGORY") {
      setIsFood(false);
      setIsCategory(true);
    }
  };

  return (
    <>
      <div className="view-menu-container">
        <div className="view-menu-tab-button-container">
          <Space wrap>
            <Button
              className={isFood && "active-button"}
              onClick={() => onClikNavBtn("FOOD")}
            >
              Food
            </Button>
            <Button
              className={isCategory && "active-button"}
              onClick={() => onClikNavBtn("CATEGORY")}
            >
              Category
            </Button>
          </Space>
        </div>

        <div className="content-container">
          {isFood ? (
            <ViewFoodLayout></ViewFoodLayout>
          ) : (
            <ViewCategoryLayout></ViewCategoryLayout>
          )}
        </div>
      </div>
    </>
  );
}
export default ViewMenuLayout;
