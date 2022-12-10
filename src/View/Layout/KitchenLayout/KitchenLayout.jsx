import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Menu, Row, Col, Layout } from "antd";
import AuthConsumer from "../../../hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";

function KitchenLayout() {
  const navigate = useNavigate();
  const [authed, dispatch] = AuthConsumer();
  const data = JSON.parse(sessionStorage.getItem("userData"));
  const [user, userLoading, userError, userSnapshot] = useDocumentData(
    UserController.getUserProfileByEmail(data.email),
    {
      idField: "id",
    }
  );
  const [restaurant, restaurantLoading, restaurantError, restaurantSnapshot] =
    useDocumentData(
      RestaurantController.getRestaurantProfileById(data.restaurantId),
      {
        idField: "id",
      }
    );

  const renderNavbar = () => {
    return (
      <nav>
        <Menu className="navbar" mode={"horizontal"}>
          {!restaurantLoading ? (
            <NavbarRestaurantProfile
              restaurantData={restaurant}
            />
          ) : (
            <></>
          )}
          <Menu.Item key="dashboard">
            <Link to="/kitchen">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="menu">
            <Link to="/kitchen/menu">Menu</Link>
          </Menu.Item>
          {!userLoading ? <NavbarUserProfile userData={user} /> : <></>}
        </Menu>
      </nav>
    );
  };

  return (
    <div className="kitchen-layout-container">
      {renderNavbar()}
      <div className="kitchen-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default KitchenLayout;
