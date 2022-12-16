import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthConsumer from "../../../hooks/auth";
import { Menu, Input, Space } from "antd";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { RestaurantController } from "../../../Controller/RestaurantController";
import { UserController } from "../../../Controller/UserController";
import NavbarRestaurantProfile from "../../Component/NavbarRestaurantProfile/NavbarRestaurantProfile";
import NavbarUserProfile from "../../Component/NavbarUserProfile/NavbarUserProfile";

function CashierLayout() {
  const data = JSON.parse(sessionStorage.getItem("userData"));
  const { Search } = Input;
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

  const onSearch = (value) => {
    return console.log();
  };

  const renderNavbar = () => {
    return (
      <nav>
        <Menu className="navbar" mode={"horizontal"}>
          {!restaurantLoading ? (
            <NavbarRestaurantProfile restaurantData={restaurant} />
          ) : (
            <></>
          )}
          <Search
            placeholder="Search order or menu"
            allowClear
            onSearch={onSearch}
            style={{
              width: 250,
            }}
          />
          <Menu.Item key="dashboard">
            <Link to="/cashier">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="menu">
            <Link to="/cashier/menuAvailibility">Menu</Link>
          </Menu.Item>
          <Menu.Item key="report">
            <Link to="/cashier/report">Report</Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Link to="/cashier/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link to="/cashier/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="qrCode">
            <Link to="/cashier/generateQrCode">QR Code</Link>
          </Menu.Item>
          {!userLoading ? <NavbarUserProfile userData={user} /> : <></>}
        </Menu>
      </nav>
    );
  };

  return (
    <div className="cashier-layout-container">
      {renderNavbar()}
      <div className="cashier-layout-content-container">
        <Outlet />
      </div>
    </div>
  );
}

export default CashierLayout;
