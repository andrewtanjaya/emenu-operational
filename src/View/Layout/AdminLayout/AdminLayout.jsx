import { Menu } from "antd";
import React, { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Link, Outlet } from "react-router-dom";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";
import "./AdminLayout.css";

function AdminLayout() {
  const data = JSON.parse(sessionStorage.getItem("userData"));
  console.log(data);

  const [user, userLoading, userError, userSnapshot] = useDocumentData(
    UserController.getUserProfileByEmail("agusmanager@gmail.com"),
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
  console.log("layout user", user);
  // console.log("layout resto", restaurant);

  const renderNavbar = () => {
    return (
      <nav>
        <Menu className="navbar" mode={"horizontal"}>
          <NavbarRestaurantProfile restaurantData={restaurant} />
          <Menu.Item key="dashboard">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="transactionReport">
            <Link to="/admin/transactionReport">Transaction Report</Link>
          </Menu.Item>
          <Menu.Item key="employee">
            <Link to="/admin/employee">Employee</Link>
          </Menu.Item>
          <Menu.Item key="food">
            <Link to="/admin/food">Food</Link>
          </Menu.Item>
          <Menu.Item key="setting">
            <Link to="/admin/setting">Setting</Link>
          </Menu.Item>
          <NavbarUserProfile userData={user} />
        </Menu>
      </nav>
    );
  };

  return (
    <div>
      {renderNavbar()}
      <div className="admin-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
